import { loadEnvFiles } from "@/db/load-env";
import { validateRuntimeEnv } from "./runtime";

loadEnvFiles();
validateRuntimeEnv();
console.log("ops:validate-env — runtime environment OK");
