"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        user: function (_, __, _a) {
            var api = _a.api;
            api.patch.create({
                id: "1234",
                uuid: "1234"
            });
            return {
                id: "1234",
                username: "1234"
            };
        }
    }
};
exports.default = resolvers;
