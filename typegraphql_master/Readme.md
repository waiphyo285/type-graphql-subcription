## Running our application
 To start our application, we first run `npm run build-tsc` or `npm run build-ts`, which compiles our code, then `npm start`, which starts up our server. Note that TypeScript catches any compile-time errors when we build our code with the compiler (.tsc).

## Running on playground
 After we are done, we can navigate to the GraphQL playground at `http://localhost:3333/graphql` to test our API 🙂.

## Graphql API
### Mutate
  * ``mutation {
   createCategory(data: { name: "T-shirts", description: "Note your description" }) {
      id
      name
      description
   }
 }``
 * ``mutation {
   deleteCategory(id: "ObjectID")
 }``

### Query
  * ``query {
    returnSingleCategory(id: "ObjectID") {
      id
      name
      description
    }
 }``

 * ``query {
   returnAllCategories {
     id
     name
     description
   }
 }``

### Subscription
```
LocationSubscription
.......................................................................................................
 mutation {
  locationMutation(
    longitude: 0.0000, latitude: 0.0000
  )
}

subscription {
  locationSubscription {
    topic
    longitude
    latitude
    date
  }
}
```

```
MessageSubscription
.......................................................................................................
mutation {
  pubSubMutation(message: "Hello")
}

mutation {
  publisherMutation(message: "Hello")
}

subscription{
  normalSubscription {
    id
    topic
    message
    date
  }
}

subscription{
  subscriptionWithFilter {
    id
    topic
    message
    date
  }
}
```

```
DynamicTopicSubscription
.......................................................................................................
mutation {
  pubSubMutationToDynamicTopic(topic:"COFFEE", message: "Hello")
}

subscription{
  subscriptionWithFilterToDynamicTopic( topic: "COFFEE"){
    id
    topic
    message
    date
  }
}
```