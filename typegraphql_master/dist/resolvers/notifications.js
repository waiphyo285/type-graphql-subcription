"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const Notification_1 = require("../entities/Notification");
let NotificationResolver = class NotificationResolver {
    constructor() {
        this.autoIncrement = 0;
    }
    currentDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Date();
        });
    }
    pubSubMutation(pubSub, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id: ++this.autoIncrement, message };
            yield pubSub.publish("NOTIFICATIONS", payload);
            return true;
        });
    }
    publisherMutation(publish, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield publish({ id: ++this.autoIncrement, message });
            return true;
        });
    }
    // listen to all pubSubMutation, publisherMutation 
    normalSubscription({ id, message }) {
        return { id, topic: "NOTIFICATIONS", message, date: new Date() };
    }
    // listen to filterize pubSubMutation, publisherMutation 
    subscriptionWithFilter({ id, message }) {
        const newNotification = { id, topic: "NOTIFICATIONS", message, date: new Date() };
        return newNotification;
    }
    // dynamic topic to listen
    pubSubMutationToDynamicTopic(pubSub, topic, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id: ++this.autoIncrement, message };
            yield pubSub.publish(topic, payload);
            return true;
        });
    }
    // listen to pubSubMutationToDynamicTopic with topic
    subscriptionWithFilterToDynamicTopic({ id, message }, topic) {
        return { id, topic, message, date: new Date() };
    }
};
__decorate([
    type_graphql_1.Query(() => Date),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "currentDate", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.PubSub()),
    __param(1, type_graphql_1.Arg("message", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSubEngine, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "pubSubMutation", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.PubSub("NOTIFICATIONS")),
    __param(1, type_graphql_1.Arg("message", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "publisherMutation", null);
__decorate([
    type_graphql_1.Subscription({ topics: "NOTIFICATIONS" }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Notification_1.Notification)
], NotificationResolver.prototype, "normalSubscription", null);
__decorate([
    type_graphql_1.Subscription(() => Notification_1.Notification, {
        topics: "NOTIFICATIONS",
        filter: ({ payload }) => payload.id % 2 === 0,
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "subscriptionWithFilter", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.PubSub()),
    __param(1, type_graphql_1.Arg("topic")),
    __param(2, type_graphql_1.Arg("message", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSubEngine, String, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "pubSubMutationToDynamicTopic", null);
__decorate([
    type_graphql_1.Subscription({ topics: ({ args }) => args.topic }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("topic")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Notification_1.Notification)
], NotificationResolver.prototype, "subscriptionWithFilterToDynamicTopic", null);
NotificationResolver = __decorate([
    type_graphql_1.Resolver()
], NotificationResolver);
exports.NotificationResolver = NotificationResolver;
//# sourceMappingURL=notifications.js.map