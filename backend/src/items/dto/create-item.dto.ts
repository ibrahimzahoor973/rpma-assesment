import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}