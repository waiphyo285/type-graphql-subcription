import { Resolver, Root, Query, Mutation, Subscription, PubSub, Publisher, Arg, ResolverFilterData } from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { Notification, NotificationPayload } from "../entities/Notification";

@Resolver()
export class NotificationResolver {
  private autoIncrement = 0;

  @Query(() => Date)
  async currentDate() {
    return await new Date();
  }

  @Mutation(() => Boolean)
  async pubSubMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg("message", { nullable: true }) message?: string,
  ): Promise<boolean> {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message };
    await pubSub.publish("NOTIFICATIONS", payload);
    return true;
  }

  @Mutation(() => Boolean)
  async publisherMutation(
    @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    @Arg("message", { nullable: true }) message?: string,
  ): Promise<boolean> {
    await publish({ id: ++this.autoIncrement, message });
    return true;
  }

  // listen to all pubSubMutation, publisherMutation 
  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(@Root() { id, message }: NotificationPayload): Notification {
    return { id, topic: "NOTIFICATIONS", message, date: new Date() };
  }

  // listen to filterize pubSubMutation, publisherMutation 
  @Subscription(() => Notification, {
    topics: "NOTIFICATIONS",
    filter: ({ payload }: ResolverFilterData<NotificationPayload>) => payload.id % 2 === 0,
  })
  subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
    const newNotification: Notification = { id, topic: "NOTIFICATIONS", message, date: new Date() };
    return newNotification;
  }

  // dynamic topic to listen
  @Mutation(() => Boolean)
  async pubSubMutationToDynamicTopic(
    @PubSub() pubSub: PubSubEngine,
    @Arg("topic") topic: string,
    @Arg("message", { nullable: true }) message?: string,
  ): Promise<boolean> {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message };
    await pubSub.publish(topic, payload);
    return true;
  }

  // listen to pubSubMutationToDynamicTopic with topic
  @Subscription({ topics: ({ args }) => args.topic })
  subscriptionWithFilterToDynamicTopic(
    @Root() { id, message }: NotificationPayload,
    @Arg("topic") topic: string,
  ): Notification {
    return { id, topic, message, date: new Date() };
  }
}