import { MigrationInterface, QueryRunner } from 'typeorm';

export class DepartmentHistory1721279085568 implements MigrationInterface {
  name = 'DepartmentHistory1721279085568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "department_history" ("id" SERIAL NOT NULL, "changed_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" integer, "department_id" integer, CONSTRAINT "PK_d277c3409b89c89abd78b21ebe4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_history" ADD CONSTRAINT "FK_857abf44e1337a4bfd3409b30d7" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_history" ADD CONSTRAINT "FK_8314dea1f13800cae1ae2186598" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department_history" DROP CONSTRAINT "FK_8314dea1f13800cae1ae2186598"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_history" DROP CONSTRAINT "FK_857abf44e1337a4bfd3409b30d7"`,
    );
    await queryRunner.query(`DROP TABLE "department_history"`);
  }
}
