import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
}