import { Follow } from 'src/follow/follow.model'
import { Post } from 'src/post/post.model'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  streamKey: string

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[]

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}
