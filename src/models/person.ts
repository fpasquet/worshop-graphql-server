import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Book } from './book';

@Entity()
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field()
  bio?: string;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book])
  books: Book[];
}
