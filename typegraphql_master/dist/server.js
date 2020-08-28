"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
const config = __importStar(require("./data/config.json"));
// resolvers
const products_1 = require("./resolvers/products");
const categories_1 = require("./resolvers/categories");
const notifications_1 = require("./resolvers/notifications");
const locations_1 = require("./resolvers/locations");
const PORT = config.port;
const DB = config.db;
const master = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [categories_1.CategoriesResolver, products_1.ProductResolver, notifications_1.NotificationResolver, locations_1.LocationResolver],
        dateScalarMode: "isoDate",
        emitSchemaFile: true,
        validate: false,
    });
    // create mongoose connection
    const mongoose = yield mongoose_1.connect(`mongodb://localhost:27017/${DB}`, { useNewUrlParser: true });
    yield mongoose.connection;
    // connect apollo connection 
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        introspection: true,
        playground: true,
        subscriptions: {
            path: "/subscriptions"
        }
    });
    // express instance
    const app = express_1.default();
    server.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    // server listen on 
    httpServer.listen({ port: PORT }, () => {
        console.log(`> Server listen at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`> Subscription listen at ws://localhost:${PORT}${server.subscriptionsPath}`);
    });
});
master().catch((error) => {
    console.log(error, 'error');
});
//# sourceMappingURL=server.js.map