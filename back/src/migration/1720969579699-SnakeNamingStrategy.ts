import { MigrationInterface, QueryRunner } from 'typeorm';

export class SnakeNamingStrategy1720969579699 implements MigrationInterface {
  name = 'SnakeNamingStrategy1720969579699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "firstName" TO "first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "lastName" TO "last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "hireDate" TO "hire_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "departmentId" TO "department_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "department_id" TO "departmentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "hire_date" TO "hireDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "last_name" TO "lastName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" RENAME COLUMN "first_name" TO "firstName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
