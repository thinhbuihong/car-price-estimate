import { Transform } from 'class-transformer';
import {
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsNumber,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => +value)
  @IsLatitude()
  lat: number;
}
