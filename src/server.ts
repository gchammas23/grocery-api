import "dotenv/config";
import express from "express";
import config from "./utils/config";
import authRoutes from "./auth/auth.routes";
import {errorMiddleware} from "./middlewares/errorMiddleware";

// Set up express application
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorMiddleware);
const port: string | number = config.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})