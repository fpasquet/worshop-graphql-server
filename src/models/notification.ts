import { ObjectType, Field } from 'type-graphql';

export interface NotificationPayload {
  message?: string;
}

@ObjectType()
export class Notification {
  @Field({ nullable: true })
  message?: string;

  @Field(() => Date)
  date: Date;
}
