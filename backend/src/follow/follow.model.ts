import { User } from 'src/user/user.model'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  follow: string

  @ManyToOne(() => User, (user) => user.follows)
  user: User
}
