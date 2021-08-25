import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  // @Column({ type: "uuid", name: "created_by", update: false })
  // createdBy?: string;

  // @Column({ type: "uuid", name: "updated_by" })
  // updatedBy?: string;

  @VersionColumn({ default: 1 })
  version?: number;
}
