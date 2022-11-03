import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as configEnv } from "dotenv";
configEnv();
const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.HASURA_URL || "http://128.199.110.106:8080/v1/graphql"]: {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_SECRET || "myadminsecretkey",
      },
    },
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/index.ts": {
      plugins: [
        "typescript-react-apollo",
        "typescript",
        "typescript-operations",
      ],
    },
  },
};

export default config;