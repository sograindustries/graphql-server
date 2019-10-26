"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        viewer: function (_, __, _a) {
            var auth = _a.auth;
            console.log("AUTH: ", auth);
            if (!auth) {
                return null;
            }
            return {
                username: "will@argosindustries.com",
                id: "will@argosindustries.com"
            };
        }
    }
};
exports.default = resolvers;
