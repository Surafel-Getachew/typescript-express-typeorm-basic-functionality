import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../common/BaseModel";
import { User } from "../entity/User";
import { IsNotEmpty } from "class-validator";
@Entity()
export class Post extends BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
