import { ObjectType, ArgsType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Categories model" })
export class Categories {
    @Field(()=> ID)
    id: string;

    @Field() 
    @Property()
    name: String;

    @Field()
    @Property()
    description: String;
}

export const CategoriesModel = getModelForClass(Categories);

export interface CategoryPayload {
    name: String;
  }
  
@ArgsType()
export class CategoryArgs {
  @Field(_type => ID)
  recipeId: string;
}