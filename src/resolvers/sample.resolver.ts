import { Resolver, Query } from 'type-graphql';

@Resolver()
export class SampleResolver {
  @Query(() => String)
  sample(): string {
    return 'hello world';
  }
}
