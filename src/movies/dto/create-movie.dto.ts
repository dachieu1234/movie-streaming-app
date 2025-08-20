import { IsString, IsOptional, IsDateString, IsInt } from "class-validator";
export class CreateMovieDto {
  @IsString() 
  title: string;
  
  @IsString() 
  slug: string;
  
  @IsOptional()
  @IsString() 
  description?: string;
  
  @IsOptional() 
  @IsDateString() 
  release_date?: string;
  
  @IsOptional() 
  @IsInt() 
  duration?: number;
  
  @IsString() 
  type: string;
  
  @IsOptional() 
  @IsString() 
  poster_url?: string;
  
  @IsOptional()
  @IsString() 
  cover_url?: string;
  
  @IsOptional() 
  @IsInt() 
  country_id?: number;
}
