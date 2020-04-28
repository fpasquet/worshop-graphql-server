import { InputType, Field, ID } from 'type-graphql';

import { ProductFilter } from './product-filter';
import { Book } from '../book';

@InputType()
export class BookFilter extends ProductFilter implements Partial<Book> {
  @Field(() => ID, { nullable: true })
  authorId?: number;
}
