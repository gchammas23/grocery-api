import app from "./app"; // Import the app (This was done to properly implement jest testing)
import config from "./utils/config";

// Start the server on specified port
const port: string | number = config.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});