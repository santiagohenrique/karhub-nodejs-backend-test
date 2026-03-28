import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePartTable1774668815053 implements MigrationInterface {
    name = 'CreatePartTable1774668815053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parts\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`category\` enum ('engine', 'transmission', 'suspension') NOT NULL, \`current_stock\` int NOT NULL, \`minimum_stock\` int NOT NULL, \`average_daily_sales\` float NOT NULL, \`lead_time_days\` int NOT NULL, \`unit_cost\` decimal(10,2) NOT NULL, \`criticality_level\` enum ('1', '2', '3', '4', '5') NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`parts\``);
    }

}
