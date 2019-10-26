"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var schema_graphql_1 = require("./query/schema.graphql");
var schema_graphql_2 = require("./user/schema.graphql");
var schema_graphql_3 = require("./patch/schema.graphql");
var schema_graphql_4 = require("./viewer/schema.graphql");
exports.default = merge_graphql_schemas_1.mergeTypes([schema_graphql_1.default, schema_graphql_2.default, schema_graphql_3.default, schema_graphql_4.default]);
