import { Resolver, Subscription, Root } from 'type-graphql';

import { Notification, NotificationPayload } from '../models/notification';

@Resolver(() => Notification)
export class NotificationResolver {
  @Subscription({ topics: 'NOTIFICATIONS' })
  newNotification(@Root() { message }: NotificationPayload): Notification {
    return { message, date: new Date() };
  }
}
