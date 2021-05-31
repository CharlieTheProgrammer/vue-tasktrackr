
import { IsBoolean, IsNotEmpty, IsInt, IsString } from 'class-validator';
export class CreateCategoryDto {
  // This has no decoraQtor and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsBoolean()
  hidden: boolean;

  constructor() {
    this.id = null;
    this.name = '';
    this.userId = 1; // get the user id from the auth
    this.hidden = false
  }

}
