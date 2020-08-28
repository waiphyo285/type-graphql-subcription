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
exports.LocationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const Location_1 = require("../entities/Location");
let LocationResolver = class LocationResolver {
    currentLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield {
                latitude: 0.000,
                longitude: 0.000
            };
        });
    }
    locationMutation(pubSub, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { latitude, longitude };
            yield pubSub.publish("LOCNOTIFICATION", payload);
            return true;
        });
    }
    // listen to all pubSubMutation, publisherMutation 
    locationSubscription({ latitude, longitude }) {
        return { topic: "LOCNOTIFICATION", latitude, longitude, date: new Date() };
    }
};
__decorate([
    type_graphql_1.Query(() => Date),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "currentLocation", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.PubSub()),
    __param(1, type_graphql_1.Arg("latitude", { nullable: true })),
    __param(2, type_graphql_1.Arg("longitude", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSubEngine, Number, Number]),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "locationMutation", null);
__decorate([
    type_graphql_1.Subscription({ topics: "LOCNOTIFICATION" }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Location_1.Location)
], LocationResolver.prototype, "locationSubscription", null);
LocationResolver = __decorate([
    type_graphql_1.Resolver()
], LocationResolver);
exports.LocationResolver = LocationResolver;
//# sourceMappingURL=locations.js.map