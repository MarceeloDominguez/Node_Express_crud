import app from "./server/app.js";
import { PORT } from "./server/config.js";
import { connectDB } from "./server/db.js";

connectDB();

app.listen(PORT);

console.log("Server in Port", PORT);
