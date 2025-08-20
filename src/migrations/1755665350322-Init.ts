import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755665350322 implements MigrationInterface {
  name = "Init1755665350322";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "watch_history" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "movie_id" integer,
                "episode_id" integer,
                "watched_at" TIMESTAMP NOT NULL DEFAULT now(),
                "progress" double precision,
                CONSTRAINT "PK_4a7d6381618ede4bcde39b5a708" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "subtitles" (
                "id" SERIAL NOT NULL,
                "movie_id" integer,
                "episode_id" integer,
                "language" character varying,
                "url" text NOT NULL,
                CONSTRAINT "PK_9ac397e12396227e34ba97af99e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "seasons" (
                "id" SERIAL NOT NULL,
                "movie_id" integer NOT NULL,
                "season_number" integer NOT NULL,
                "title" character varying,
                "description" text,
                CONSTRAINT "PK_cb8ed53b5fe109dcd4a4449ec9d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "description" text,
                "release_date" date,
                "duration" integer,
                "type" character varying NOT NULL,
                "poster_url" text,
                "cover_url" text,
                "country_id" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_6ed86498aefe0e545548ca31b78" UNIQUE ("slug"),
                CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password_hash" text NOT NULL,
                "role" character varying NOT NULL DEFAULT 'user',
                "avatar_url" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "reviews" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "movie_id" integer NOT NULL,
                "rating" integer,
                "comment" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "video_sources" (
                "id" SERIAL NOT NULL,
                "movie_id" integer,
                "episode_id" integer,
                "quality" character varying,
                "language" character varying,
                "url" text NOT NULL,
                CONSTRAINT "PK_2b4ff25794018ffbe9afdd25e95" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "movie_genres" (
                "movie_id" integer NOT NULL,
                "genre_id" integer NOT NULL,
                CONSTRAINT "PK_ec45eae1bc95d1461ad55713ffc" PRIMARY KEY ("movie_id", "genre_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "movie_actors" (
                "movie_id" integer NOT NULL,
                "actor_id" integer NOT NULL,
                "role" character varying,
                CONSTRAINT "PK_71385034c67fafe3ebf8748cab9" PRIMARY KEY ("movie_id", "actor_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "episodes" (
                "id" SERIAL NOT NULL,
                "season_id" integer NOT NULL,
                "episode_number" integer NOT NULL,
                "title" character varying,
                "description" text,
                "duration" integer,
                "release_date" date,
                CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "countries" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"),
                CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "actors" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "bio" text,
                "birth_date" date,
                "photo_url" text,
                CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "ad_placements" (
                "id" SERIAL NOT NULL,
                "ad_id" integer NOT NULL,
                "page" character varying NOT NULL,
                "slot" character varying NOT NULL,
                CONSTRAINT "PK_62a8b2c95a7bcd87f58f5d7e657" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "ads" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL,
                "position" character varying NOT NULL,
                "media_url" text,
                "target_url" text,
                "start_date" date,
                "end_date" date,
                "impressions" integer NOT NULL DEFAULT '0',
                "clicks" integer NOT NULL DEFAULT '0',
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "daily_stats" (
                "id" SERIAL NOT NULL,
                "date" date NOT NULL,
                "new_users" integer NOT NULL DEFAULT '0',
                "total_users" integer NOT NULL DEFAULT '0',
                "total_views" integer NOT NULL DEFAULT '0',
                "total_watch_time" bigint NOT NULL DEFAULT '0',
                "top_movie_id" integer,
                CONSTRAINT "UQ_b1ac0c4b592aa8dd567515a7796" UNIQUE ("date"),
                CONSTRAINT "PK_d1830b57aa5fafc5cb26a09aa73" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "ad_logs" (
                "id" SERIAL NOT NULL,
                "ad_id" integer NOT NULL,
                "user_id" integer,
                "event" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b55851af3e1784b6b56f7cd8af4" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "ad_logs"
        `);
    await queryRunner.query(`
            DROP TABLE "daily_stats"
        `);
    await queryRunner.query(`
            DROP TABLE "ads"
        `);
    await queryRunner.query(`
            DROP TABLE "ad_placements"
        `);
    await queryRunner.query(`
            DROP TABLE "actors"
        `);
    await queryRunner.query(`
            DROP TABLE "countries"
        `);
    await queryRunner.query(`
            DROP TABLE "episodes"
        `);
    await queryRunner.query(`
            DROP TABLE "genres"
        `);
    await queryRunner.query(`
            DROP TABLE "movie_actors"
        `);
    await queryRunner.query(`
            DROP TABLE "movie_genres"
        `);
    await queryRunner.query(`
            DROP TABLE "video_sources"
        `);
    await queryRunner.query(`
            DROP TABLE "reviews"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "movies"
        `);
    await queryRunner.query(`
            DROP TABLE "seasons"
        `);
    await queryRunner.query(`
            DROP TABLE "subtitles"
        `);
    await queryRunner.query(`
            DROP TABLE "watch_history"
        `);
  }
}
