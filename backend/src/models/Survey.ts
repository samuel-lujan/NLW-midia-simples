import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('surveys')
class Survey{
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    title: string;

    @Column()
    description: String;

    @CreateDateColumn()
    created_at: Date;
}

export { Survey }