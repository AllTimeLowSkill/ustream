import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  firstname: string

  @Column({ nullable: true })
  lastname: string

  @Column({ nullable: true })
  aboutMe: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  date: string

  @Column('uuid')
  userId: string
}
