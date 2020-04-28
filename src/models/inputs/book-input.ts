import { InputType, Field } from 'type-graphql';

import { ProductInput } from './product-input';
import { Book } from '../book';

@InputType()
export class BookInput extends ProductInput implements Partial<Book> {
  @Field({ nullable: true })
  isbn?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ nullable: true })
  edition?: string;

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  numberOfPage?: number;

  @Field({ nullable: true })
  authorId?: number;
}
