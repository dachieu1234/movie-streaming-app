// dto/create-movie.dto.ts
import {
    IsString,
    IsOptional,
    IsDateString,
    IsInt,
    IsEnum,
    IsUrl,
    ValidateNested,
    IsArray,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateSubtitleDto {
    @ApiProperty({ example: 'en' })
    @IsString()
    @IsNotEmpty({ message: 'Language is required' })
    language: string;

    @ApiProperty({ example: 'video.vll' })
    @IsString()
    @IsNotEmpty({ message: 'Url is required' })
    url: string;
}

class CreateVideoSourceDto {
    @ApiProperty({ example: '1080p' })
    @IsString()
    @IsNotEmpty({ message: 'Quality is required' })
    quality: string;

    @ApiProperty({ example: 'en' })
    @IsString()
    @IsNotEmpty({ message: 'Language is required' })
    language: string;

    @ApiProperty({ example: 'video.mp4' })
    @IsString()
    @IsNotEmpty({ message: 'Url is required' })
    url: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty({ message: 'episode_number is required' })
    episode_number: number;

    @ApiProperty({ example: 60 })
    @IsInt()
    @IsNotEmpty({ message: 'Duration is required' })
    duration: number;

    @ApiProperty({ example: 'Winter Is Coming' })
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiPropertyOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2011-04-17' })
    @IsDateString()
    @IsNotEmpty({ message: 'Release date is required' })
    release_date: string;

    @ApiPropertyOptional({ type: [CreateSubtitleDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateSubtitleDto)
    @IsOptional()
    sub_titles?: CreateSubtitleDto[];
}

class CreateSeasonDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty({ message: 'Season number is required' })
    season_number: number;

    @ApiProperty({ example: 'Season 1' })
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiPropertyOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ type: [CreateVideoSourceDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateVideoSourceDto)
    @IsNotEmpty({ message: 'Video sources is required' })
    @IsOptional()
    video_sources: CreateVideoSourceDto[];
}

export class CreateMovieDto {
    @ApiProperty({ example: 'Avengers: Endgame' })
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty({ example: 'avengers-endgame' })
    @IsString()
    @IsNotEmpty({ message: 'Slug is required' })
    slug: string;

    @ApiPropertyOptional({ example: 'The epic conclusion' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2019-04-26' })
    @IsDateString()
    @IsNotEmpty({ message: 'Release date is required' })
    release_date: string;

    @ApiProperty({ example: 181 })
    @IsInt()
    @IsNotEmpty({ message: 'Duration is required' })
    duration: number;

    @ApiProperty({ enum: ['movie', 'series'] })
    @IsEnum(['movie', 'series'])
    @IsNotEmpty({ message: 'Type is required' })
    type: 'movie' | 'series';

    @ApiProperty({ example: 'http://example.com/poster.jpg' })
    @IsUrl()
    poster_url: string;

    @ApiProperty({ example: 'http://example.com/cover.jpg' })
    @IsUrl()
    cover_url: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    country_id: number;

    @ApiProperty({ type: [Number], example: [1, 2] })
    @IsArray()
    @IsInt({ each: true })
    genre_ids: number[];

    @ApiProperty({ type: [Number], example: [1, 2, 3] })
    @IsArray()
    actor_ids: number[];

    @ApiPropertyOptional({ type: [CreateSeasonDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateSeasonDto)
    @IsOptional()
    seasons?: CreateSeasonDto[];

    @ApiPropertyOptional({ type: [CreateVideoSourceDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateVideoSourceDto)
    @IsOptional()
    video_sources?: CreateVideoSourceDto[];
}
