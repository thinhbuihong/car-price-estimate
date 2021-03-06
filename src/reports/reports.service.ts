import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate(estimateDto: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('*')
        .where('make = :make', { make: estimateDto.make })
        // .andWhere('approved IS TRUE')
        .andWhere('model = :model', { model: estimateDto.model })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat })
        .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
        .orderBy(`ABS(mileage - ${estimateDto.mileage})`, 'DESC')
        .limit(3)
        .getRawMany()
    );
  }
}
