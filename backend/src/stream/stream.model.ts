import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stream {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    streamId: string

    @Column('uuid')
    streamKey: string

    @Column()
    username: string
}