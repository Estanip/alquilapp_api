import app from "./app";
import { env } from "../env";

//test 

app.listen(env.API_PORT, () => {
  console.log(`Server running on port ${env.API_PORT}`);
});
