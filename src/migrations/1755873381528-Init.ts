import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755873381528 implements MigrationInterface {
    name = 'Init1755873381528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "countries" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"),
                CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
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
            CREATE TABLE "actors" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "bio" text,
                "birth_date" date,
                "photo_url" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id")
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
            CREATE TABLE "subtitles" (
                "id" SERIAL NOT NULL,
                "video_source_id" integer NOT NULL,
                "language" character varying NOT NULL,
                "url" text NOT NULL,
                CONSTRAINT "PK_9ac397e12396227e34ba97af99e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "video_sources" (
                "id" SERIAL NOT NULL,
                "movie_id" integer NOT NULL,
                "season_id" integer NOT NULL,
                "quality" character varying NOT NULL,
                "language" character varying NOT NULL,
                "url" text NOT NULL,
                "episode_number" integer NOT NULL,
                "title" character varying,
                "description" text,
                "duration" integer,
                "release_date" date,
                CONSTRAINT "PK_2b4ff25794018ffbe9afdd25e95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "seasons" (
                "id" SERIAL NOT NULL,
                "movie_id" integer NOT NULL,
                "season_number" integer NOT NULL,
                "title" character varying,
                "description" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
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
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "country_id" integer,
                CONSTRAINT "UQ_6ed86498aefe0e545548ca31b78" UNIQUE ("slug"),
                CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id")
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
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password_hash" text NOT NULL,
                "role" text NOT NULL DEFAULT 'user',
                "avatar_url" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "watch_history" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "movie_id" integer NOT NULL,
                "video_source_id" integer NOT NULL,
                "watched_at" TIMESTAMP NOT NULL DEFAULT now(),
                "progress" double precision NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4a7d6381618ede4bcde39b5a708" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ad_logs" (
                "id" SERIAL NOT NULL,
                "ad_id" integer NOT NULL,
                "user_id" integer,
                "event" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b55851af3e1784b6b56f7cd8af4" PRIMARY KEY ("id")
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
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
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
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_b1ac0c4b592aa8dd567515a7796" UNIQUE ("date"),
                CONSTRAINT "PK_d1830b57aa5fafc5cb26a09aa73" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ad_placements" (
                "id" SERIAL NOT NULL,
                "ad_id" integer NOT NULL,
                "page" character varying NOT NULL,
                "slot" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_62a8b2c95a7bcd87f58f5d7e657" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres"
            ADD CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres"
            ADD CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors"
            ADD CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors"
            ADD CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "subtitles"
            ADD CONSTRAINT "FK_34968099472fac9f67f8096fcae" FOREIGN KEY ("video_source_id") REFERENCES "video_sources"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ADD CONSTRAINT "FK_a8eee5f60a7e21090cc09da2988" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ADD CONSTRAINT "FK_3620bd2c7a705171d41df297f98" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons"
            ADD CONSTRAINT "FK_f7f42424b2e75b8baa732a2c67d" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "movies"
            ADD CONSTRAINT "FK_b50bc1bb6cce7b1f5142dce6f82" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "FK_563501cf3faa75a1ca40be84f82" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "watch_history"
            ADD CONSTRAINT "FK_5e1169219c2bda5624a4b65742d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "watch_history"
            ADD CONSTRAINT "FK_cff7480bc2d70fc9e78f4ec6204" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "watch_history"
            ADD CONSTRAINT "FK_dfcc4e5f778e1e8045d2d43539b" FOREIGN KEY ("video_source_id") REFERENCES "video_sources"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "watch_history" DROP CONSTRAINT "FK_dfcc4e5f778e1e8045d2d43539b"
        `);
        await queryRunner.query(`
            ALTER TABLE "watch_history" DROP CONSTRAINT "FK_cff7480bc2d70fc9e78f4ec6204"
        `);
        await queryRunner.query(`
            ALTER TABLE "watch_history" DROP CONSTRAINT "FK_5e1169219c2bda5624a4b65742d"
        `);
        await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "FK_563501cf3faa75a1ca40be84f82"
        `);
        await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"
        `);
        await queryRunner.query(`
            ALTER TABLE "movies" DROP CONSTRAINT "FK_b50bc1bb6cce7b1f5142dce6f82"
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons" DROP CONSTRAINT "FK_f7f42424b2e75b8baa732a2c67d"
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources" DROP CONSTRAINT "FK_3620bd2c7a705171d41df297f98"
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources" DROP CONSTRAINT "FK_a8eee5f60a7e21090cc09da2988"
        `);
        await queryRunner.query(`
            ALTER TABLE "subtitles" DROP CONSTRAINT "FK_34968099472fac9f67f8096fcae"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48"
        `);
        await queryRunner.query(`
            DROP TABLE "ad_placements"
        `);
        await queryRunner.query(`
            DROP TABLE "daily_stats"
        `);
        await queryRunner.query(`
            DROP TABLE "ads"
        `);
        await queryRunner.query(`
            DROP TABLE "ad_logs"
        `);
        await queryRunner.query(`
            DROP TABLE "watch_history"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "reviews"
        `);
        await queryRunner.query(`
            DROP TABLE "movies"
        `);
        await queryRunner.query(`
            DROP TABLE "seasons"
        `);
        await queryRunner.query(`
            DROP TABLE "video_sources"
        `);
        await queryRunner.query(`
            DROP TABLE "subtitles"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_actors"
        `);
        await queryRunner.query(`
            DROP TABLE "actors"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres"
        `);
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
        await queryRunner.query(`
            DROP TABLE "countries"
        `);
    }

}
