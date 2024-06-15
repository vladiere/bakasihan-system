import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Express } from "express";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Logging
app.use(morgan("dev"));

// Parse the request
app.use(express.urlencoded({ extended: false }));

// Takes care of json data
app.use(express.json({ limit: "100mb" })); // Setting the data size of an json
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Default route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on Port ${PORT}`);
});
