import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  taxAmount?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  shippingAmount?: number;

  @ApiProperty()
  @IsNumber()
  grandTotal: number;

  @ApiProperty({ required: false, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  billingAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}