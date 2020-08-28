import { Resolver, Root, Query, Mutation, Subscription, PubSub, Publisher, Arg, ResolverFilterData } from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { Location, LocationPayload } from "../entities/Location";

@Resolver()
export class LocationResolver {

  @Query(() => Date)
  async currentLocation() {
    return await {
      latitude: 0.000,
      longitude: 0.000
    };
  }

  @Mutation(() => Boolean)
  async locationMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg("latitude", { nullable: true }) latitude: number,
    @Arg("longitude", { nullable: true }) longitude: number,
  ): Promise<boolean> {
    const payload: LocationPayload = { latitude, longitude };
    await pubSub.publish("LOCNOTIFICATION", payload);
    return true;
  }

  // listen to all pubSubMutation, publisherMutation 
  @Subscription({ topics: "LOCNOTIFICATION" })
  locationSubscription(@Root() { latitude , longitude }: LocationPayload): Location {
    return { topic: "LOCNOTIFICATION", latitude, longitude, date: new Date() };
  }
}