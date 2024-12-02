import dotent from "dotenv";
import path from "path";

dotent.config({ path: path.join(process.cwd(), ".env") });

export default{
    env: process.env.NODE_ENV,
    port: process.env.PORT
}