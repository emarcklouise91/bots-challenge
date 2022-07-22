import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export const BOTS_CODE_UK = 'bots_code_uk';

@Entity('bots')
@Unique(BOTS_CODE_UK, ['code'])
export class BotsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    purpose: "healthcare" | "home" | "logistics"

    @Column()
    gender: "male" | "female";

    @Column()
    avatar: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    updated_at: Date;
}
