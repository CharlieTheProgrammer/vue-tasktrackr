import { IsNotEmpty, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateProjectDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  name: string;
  
  @IsInt()
  userId: number;
  
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  constructor() {
    this.id = null;
    this.name = '';
    this.userId = 1; // get the user id from the auth
    this.hidden = false
  }
}
