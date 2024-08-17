import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5000;
let server: Server;

const main = async () => {
  server = app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
  });
};

main();

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception Happened!!!`);
  console.log(err);
  process.exit(1);
});
