import "dotenv/config";
import express from "express";
import mainConfig from "./config";

// Set up express application
const app = express();
app.use(express.json());

const port: string | number = mainConfig.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})