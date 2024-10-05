import http from "http";
import index from "./index.js";
import "dotenv/config";
import { connectToDB } from "./model/repository.js";

const port = process.env.PORT || 3002; // You can change the port if needed

const server = http.createServer(index);

server.listen(port, () => {
    console.log("Question service server listening on http://localhost:" + port);
});
