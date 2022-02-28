import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CronJob } from 'cron';
import { AudioService } from '../audio/audio.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { userDto } from './dtos/user.dto';
import { User } from './entities/users.entity';
import { TasksService } from './job/tasks.service';
import { UsersService } from './users.service';

@Controller({
  path: 'auth',
  version: '1',
})
@Serialize(userDto)
// @UseInterceptors(CurrentUserInterceptor)
//docs cua nest dung ClassSeralizerInterceptor
// su dung entity thi request nao cung tra ve giong nhau
//trong khi co luc se can data khac nhau
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private taskService: TasksService,
    private audioService: AudioService,
    @Inject(CACHE_MANAGER) private cacheManage: Cache,
  ) {}
  ///////////____________JOB

  @Version('2')
  @Get('/cache')
  async cache(@Query('key') key: string) {
    if (!key) return 'hello';

    const value = await this.cacheManage.get(key);
    if (!value) {
      console.log('add to cache');
      await this.cacheManage.set(key, 99, { ttl: 20000 });
      return `add ${key} to cache`;
    }

    return value;
  }

  @Get('/stoplog')
  stopLog() {
    this.taskService.stopLog();
  }

  @Get('/newjob')
  addJob(@Query('name') name: string, @Query('seconds') seconds: string) {
    this.taskService.addCronJob(name, seconds);
  }

  @Get('/deletejob')
  deleteJob(@Query('job') job: string) {
    this.taskService.deleteCron(job);
  }

  @Get('/crons')
  cronJobs() {
    this.taskService.getCrons();
  }

  ///////////////////////////____QUEUES
  @Get('/addJobQueue')
  async addJobQueue() {
    await this.audioService.addJob();
  }

  @Get('/addJobQueueWithname')
  async addJobQueueWithName() {
    await this.audioService.addJobWithName();
  }

  /////
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete()
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
