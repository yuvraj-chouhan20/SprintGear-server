import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../../.env.dev') });

let ENV_VARIABLES = process.env;
export default {
  ...ENV_VARIABLES
}



