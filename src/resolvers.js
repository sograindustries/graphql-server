"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var resolvers_1 = require("./query/resolvers");
var resolvers_2 = require("./user/resolvers");
var resolvers_3 = require("./patch/resolvers");
var resolvers_4 = require("./viewer/resolvers");
exports.default = merge_graphql_schemas_1.mergeResolvers([resolvers_1.default, resolvers_2.default, resolvers_3.default, resolvers_4.default]);
