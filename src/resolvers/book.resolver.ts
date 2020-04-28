import { Resolver } from 'type-graphql';

import { Book } from '../models/book';

@Resolver(() => Book)
export class BookResolver {}
