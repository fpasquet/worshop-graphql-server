import { InputType, Field, Int } from 'type-graphql';

import { Product } from '../product';

@InputType()
export abstract class ProductInput implements Partial<Product> {
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageBase64?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  salePrice?: number;

  @Field({ nullable: true })
  discountInPercent?: number;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}
