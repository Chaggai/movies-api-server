import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  NODE_ENV: str(),
  MONGO_URI: str(),
  PORT: port(),
  JWT_SECRET: str(),
});
