import "dotenv/config";
import express from "express";
import config from "./utils/config";
import authRoutes from "./auth/auth.routes";
import {errorMiddleware} from "./middlewares/errorMiddleware";
import {jwtMiddleware} from "./middlewares/jwtMiddleware";
import itemsRoutes from "./items/items.routes";

// Set up express application
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

// Protect all items routes with the JWT Middleware (User has to be logged in to call them)
app.use(jwtMiddleware);
app.use("/items", itemsRoutes);

app.use(errorMiddleware); // Ensure to add the error middleware here to handle all thrown errors

// Start the server on specified port
const port: string | number = config.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})