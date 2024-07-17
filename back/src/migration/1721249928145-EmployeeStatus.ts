import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeStatus1721249928145 implements MigrationInterface {
  name = 'EmployeeStatus1721249928145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "active"`);
  }
}
