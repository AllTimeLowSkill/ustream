import { User } from 'src/user/user.model'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.posts)
  user: User
}
