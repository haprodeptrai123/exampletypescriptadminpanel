const { config } = require("dotenv");

config();

module.exports = {
  client: {
    includes: ["./src/**/*.graphql"],
    excludes: ["./node_modules/**/*.ts", "./src/graphql/*.ts"],
    service: {
      name: "laundry-service",
      url: process.env.HASURA_URL || "http://128.199.110.106:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_SECRET || "myadminsecretkey",
      },
    },
  },
};