import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { BaseModel } from "../common/BaseModel";
import { IsNotEmpty } from "class-validator";
import { hashPassword } from "../../util/auth";
import { UserRole } from "../../enums/user.role";
import {Post} from "./Posts"

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @IsNotEmpty()
  @Column()
  email?: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }

  @OneToMany(() => Post, post => post.user )
  posts:Post[];

  bio:Post

  postCount:number
}
