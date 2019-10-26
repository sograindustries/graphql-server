"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_lambda_1 = require("apollo-server-lambda");
var schema_graphql_1 = require("./schema.graphql");
var resolvers_1 = require("./resolvers");
var api_1 = require("./api");
var aws_sdk_1 = require("aws-sdk");
var ddb = process.env.NODE_ENV === "production"
    ? new aws_sdk_1.DynamoDB.DocumentClient()
    : new aws_sdk_1.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
    });
var server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: schema_graphql_1.default,
    resolvers: resolvers_1.default,
    context: function (req) {
        var auth = extractAuthFromEvent(req.event);
        return {
            api: api_1.makeApi({}, { ddb: ddb }),
            auth: auth
        };
    }
});
function extractAuthFromEvent(event) {
    if (!event) {
        return null;
    }
    var requestContext = event["requestContext"];
    if (!requestContext) {
        return null;
    }
    var authorizer = requestContext["authorizer"];
    if (!authorizer) {
        return null;
    }
    var claims = authorizer["claims"];
    if (!claims) {
        return null;
    }
    var username = claims["cognito:username"];
    var jwt = event.headers["Authorization"];
    if (!username || !jwt) {
        return null;
    }
    return { username: username, jwt: jwt };
}
exports.graphqlHandler = server.createHandler({
    cors: {
        origin: true,
        credentials: true
    }
});
