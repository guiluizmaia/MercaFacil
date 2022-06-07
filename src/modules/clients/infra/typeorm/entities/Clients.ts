import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('clients')
  class Clients {
    @PrimaryGeneratedColumn('uuid')
    id: String;
  
    @Column()
    email: String;
  
    @Column()
    pass: String;

    @Column()
    name: String;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Clients;
  