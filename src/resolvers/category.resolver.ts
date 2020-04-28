import { Resolver } from 'type-graphql';

import { Category } from '../models/category';

@Resolver(() => Category)
export class CategoryResolver {}
