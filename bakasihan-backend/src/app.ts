import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Express } from "express";
import auth from "./routes/auth.routes";
import admin from "./routes/admin.routes"
import user from "./routes/user.routes";

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
const corsOptions = {
  origin: process.env.FRONT_END_HOST, // Replace with your client app's URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.use(helmet());

// Api routes
app.use('/api/auth',auth)
app.use('/api/admin',admin)
app.use('/api/user',user)
app.use('/api/images/',express.static('./src/public'))

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
