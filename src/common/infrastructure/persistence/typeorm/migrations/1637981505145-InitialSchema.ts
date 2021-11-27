import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637981505145 implements MigrationInterface {
    name = 'InitialSchema1637981505145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`qualifications\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`score\` varchar(255) NOT NULL, \`text_description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customContracts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`law_description\` varchar(100) NOT NULL, \`started_at\` varchar(100) NOT NULL, \`finished_at\` varchar(255) NOT NULL, \`cost\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`legalConsultations\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`law_document\` varchar(100) NOT NULL, \`law_comment\` varchar(100) NOT NULL, \`cost\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscriptions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`price\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`UQ_subscription_description\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('L', 'C') NOT NULL DEFAULT 'C', \`username\` varchar(255) NULL, \`password\` varchar(12) NULL, \`email\` varchar(255) NULL, \`phone\` varchar(9) NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NULL, \`lawyer_name\` varchar(255) NULL, \`lawyer_last_name\` varchar(255) NULL, \`district\` varchar(8) NULL, \`university\` varchar(255) NULL, \`price_legal_advice\` varchar(255) NULL, \`price_custom_contract\` varchar(255) NULL, UNIQUE INDEX \`UQ_users_dni\` (\`dni\`), UNIQUE INDEX \`UQ_users_district\` (\`district\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_users_district\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`UQ_users_dni\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`UQ_subscription_description\` ON \`subscriptions\``);
        await queryRunner.query(`DROP TABLE \`subscriptions\``);
        await queryRunner.query(`DROP TABLE \`legalConsultations\``);
        await queryRunner.query(`DROP TABLE \`customContracts\``);
        await queryRunner.query(`DROP TABLE \`qualifications\``);
    }

}
