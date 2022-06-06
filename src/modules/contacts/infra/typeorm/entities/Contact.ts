import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('clients')
  class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: String;
  
    @Column()
    nome: String;
  
    @Column()
    celular: String;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Contact;
  