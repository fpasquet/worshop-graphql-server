import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { InterfaceType, Field, ID } from 'type-graphql';

import { Category } from './category';

@InterfaceType()
export abstract class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  slug!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  imageBase64!: string;

  @Column({ type: 'float' })
  @Field()
  price!: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  salePrice?: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  discountInPercent?: number;

  @Field(() => [Category])
  categories: Category[];

  @Field(() => [ID], { nullable: true })
  categoryIds?: number[];
}
