import { ObjectType, Field, Float } from "type-graphql";

@ObjectType()
export class Location {
  @Field()
  topic: string

  @Field(() => Float, { nullable: true })
  latitude: number;

  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field(() => Date)
  date: Date;
}

export interface LocationPayload {
  latitude: number;
  longitude: number;
}