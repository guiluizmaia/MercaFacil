import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableContacts1654534218640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='contacts'    
        `);
        
        if (tableExists.length === 0) {
            await queryRunner.createTable(
              new Table({
                name: "contacts",
                columns: [
                  {
                    name: "id",
                    type: "varchar",
                    generationStrategy: "uuid",
                    isPrimary: true,
                  },
                  {
                    name: "nome",
                    type: "varchar",
                  },
                  {
                    name: "celular",
                    type: "varchar",
                  },
                  {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                  },
                  {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                  },
                ],
              })
            );
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("contacts");
    }

}
