import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Question, question => question.categories)
    questions:Question[]
}