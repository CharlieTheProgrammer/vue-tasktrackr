import { IsOptional, IsNotEmpty, IsDateString, IsString } from 'class-validator';
import { DateTime } from 'luxon';

export class CreateEntryDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  projectId: number;
  
  @IsNotEmpty()
  categoryId: number;
  
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  startTime: string;
  
  @IsDateString()
  endTime: string;

  constructor({projectId, categoryId}) {
    this.id = null;
    this.projectId = projectId;
    this.categoryId = categoryId || null;
    this.userId = 1;
    this.description = '';
    this.startTime = DateTime.now().toUTC().toISO();
    this.endTime = null;
  }

}
