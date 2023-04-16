import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class StreamInfo {
    @PrimaryColumn('uuid')
    streamKey: string

    @Column()
    categoryId: string
}