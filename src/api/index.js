"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patch_1 = require("./patch");
var user_1 = require("./user");
exports.makeApi = function (_, stores) {
    return {
        patch: patch_1.makeService(stores.ddb),
        user: user_1.makeService(stores.ddb)
    };
};
