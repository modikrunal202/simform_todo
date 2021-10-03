import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Categories } from "./Category.entity";
import { Tasks } from "./Tasks.entity";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
	id: number;

    @Column({
        type: "varchar"
    })
    first_name: string;

    @Column({
        type: "varchar"
    })
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    password: string;

    @Column({
        type:"boolean",
        default: true
    })
    is_active: boolean;

    @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @OneToMany(() => Categories, (category: Categories) => category.user_id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
   categories: Array<Categories>

   @OneToMany(() => Tasks, (tasks: Tasks) => tasks.user_id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
   tasks: Array<Tasks>
}