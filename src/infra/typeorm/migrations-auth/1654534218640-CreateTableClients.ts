import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { v4 } from 'uuid';
import { hash } from 'bcryptjs';

export class CreateTableClients1654534218640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='clients'    
        `);
        
        if (tableExists.length === 0) {
            await queryRunner.createTable(
              new Table({
                name: 'clients',
                columns: [
                  {
                    name: 'id',
                    type: 'varchar',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                  },
                  {
                    name: 'pass',
                    type: 'varchar',
                  },
                  {
                    name: 'name',
                    type: 'varchar',
                  },
                  {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                  },
                  {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                  },
                ],
              })
            );

            const pass = await hash('1234', 8)

            await queryRunner.query(`
              INSERT INTO clients(id, email, pass, name)
              VALUES ('${v4()}', 'test@macapa.com', '${pass}', 'macapa'),
              ('${v4()}', 'test@varejao.com', '${pass}', 'varejao')
            `)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('contacts');
    }

}
