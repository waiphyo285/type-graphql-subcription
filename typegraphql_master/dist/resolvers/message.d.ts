import { PubSubEngine } from "graphql-subscriptions";
import { Publisher } from "type-graphql";
import { Notification, NotificationPayload } from "../entities/Message";
export declare class SampleResolver {
    private autoIncrement;
    currentDate(): Date;
    pubSubMutation(pubSub: PubSubEngine, message?: string): Promise<boolean>;
    publisherMutation(publish: Publisher<NotificationPayload>, message?: string): Promise<boolean>;
    normalSubscription({ id, message }: NotificationPayload): Notification;
    subscriptionWithFilter({ id, message }: NotificationPayload): Notification;
    pubSubMutationToDynamicTopic(pubSub: PubSubEngine, topic: string, message?: string): Promise<boolean>;
    subscriptionWithFilterToDynamicTopic(topic: string, { id, message }: NotificationPayload): Notification;
}
