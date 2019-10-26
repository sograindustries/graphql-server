"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_lambda_1 = require("apollo-server-lambda");
var schema_graphql_1 = require("../schema.graphql");
var resolvers_1 = require("../resolvers");
exports.createMockServer = function (partialContext, partialApi) {
    return new apollo_server_lambda_1.ApolloServer({
        typeDefs: schema_graphql_1.default,
        resolvers: resolvers_1.default,
        context: function () {
            return __assign(__assign({}, partialContext), { api: partialApi });
        }
    });
};
