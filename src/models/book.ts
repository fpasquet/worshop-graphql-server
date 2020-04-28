import { Entity, ManyToOne, JoinColumn, Column, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Product } from './product';
import { Person } from './person';
import { Category } from './category';

@Entity()
@ObjectType({ implements: Product })
export class Book extends Product {
  @Column()
  @Field()
  publisher!: string;

  @Column()
  @Field()
  isbn!: string;

  @Column()
  @Field()
  edition!: string;

  @Column()
  @Field()
  language: string;

  @Column()
  @Field()
  country!: string;

  @Column({ type: 'int' })
  @Field()
  numberOfPage!: number;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'book_category',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @RelationId((book: Book) => book.categories)
  categoryIds: number[];

  @ManyToOne(() => Person)
  @JoinColumn()
  @Field(() => Person)
  author: Person;

  @Column({ nullable: true })
  authorId: number;
}
