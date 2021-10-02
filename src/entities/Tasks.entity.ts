import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categories } from "./Category.entity";
import { User } from "./User.entity";

@Entity("tasks")
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @ManyToOne(() => Categories, (category: Categories) => category.tasks)
  @JoinColumn({name: 'category_id'})
  category_id: number;

  @ManyToOne(() => User, (user: User) => user.tasks)
  @JoinColumn({name: 'user_id'})
  user_id: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
