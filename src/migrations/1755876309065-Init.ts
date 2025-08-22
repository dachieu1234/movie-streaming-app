import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755876309065 implements MigrationInterface {
    name = 'Init1755876309065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "seasons" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources" DROP CONSTRAINT "FK_a8eee5f60a7e21090cc09da2988"
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources" DROP CONSTRAINT "FK_3620bd2c7a705171d41df297f98"
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "episode_number" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "movie_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "season_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons" DROP CONSTRAINT "FK_f7f42424b2e75b8baa732a2c67d"
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons"
            ALTER COLUMN "movie_id" DROP NOT NULL
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE "seasons"
            ALTER COLUMN "movie_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons"
            ADD CONSTRAINT "FK_f7f42424b2e75b8baa732a2c67d" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "season_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "movie_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ALTER COLUMN "episode_number"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ADD CONSTRAINT "FK_3620bd2c7a705171d41df297f98" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "video_sources"
            ADD CONSTRAINT "FK_a8eee5f60a7e21090cc09da2988" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "seasons"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
