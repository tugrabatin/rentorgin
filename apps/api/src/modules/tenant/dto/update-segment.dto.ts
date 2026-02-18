import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CustomerSegmentEnum {
  A1_SOLO_MARKA = 'A1_SOLO_MARKA',
  A2_KENDI_ZINCIRI = 'A2_KENDI_ZINCIRI',
  A3_FRANCHISE_ALAN = 'A3_FRANCHISE_ALAN',
  A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU = 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU',
  A5_FRANCHISE_VEREN = 'A5_FRANCHISE_VEREN',
  A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU = 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU',
}

export class UpdateSegmentDto {
  @ApiProperty({
    enum: CustomerSegmentEnum,
    example: 'A1_SOLO_MARKA',
    description: 'Customer segment identifier / Müşteri segment tanımlayıcısı',
  })
  @IsEnum(CustomerSegmentEnum, {
    message: 'customerSegment must be one of: A1_SOLO_MARKA, A2_KENDI_ZINCIRI, A3_FRANCHISE_ALAN, A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU, A5_FRANCHISE_VEREN, A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU',
  })
  customerSegment: CustomerSegmentEnum;
}
