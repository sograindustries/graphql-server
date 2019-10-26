"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.default = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Patch {\n    id: String!\n    uuid: String!\n    data: [Int!]!\n  }\n\n  extend type User {\n    patches: [Patch!]!\n  }\n"], ["\n  type Patch {\n    id: String!\n    uuid: String!\n    data: [Int!]!\n  }\n\n  extend type User {\n    patches: [Patch!]!\n  }\n"])));
var templateObject_1;
