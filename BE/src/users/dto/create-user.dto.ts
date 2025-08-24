import { IsString, IsEmail, MinLength, IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Match } from "decorators/match.decorator";

export class CreateUserDto {
  @ApiProperty({ example: 'dachieu2801', description: 'Username' })
  @IsString() 
  @IsNotEmpty({ message: 'Username is required' })
  username: string;
 
  @ApiProperty({ example: 'example@gmail.com', description: 'Gmail' })
  @IsEmail() 
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
 
  @ApiProperty({ example: 'Abc12345', description: 'Password' })
  @IsString() @MinLength(8) 
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'The specified password contains a-z, A-Z, 0-9' })
  password: string;

  @ApiProperty({ example: 'Abc12345', description: 'Confirm Password' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: 'Confirm Password is required' })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'Confirm Password must contain only a-z, A-Z, 0-9' })
  @Match('password', { message: 'Confirm Password must match Password' })
  confirmPassword: string;
}
