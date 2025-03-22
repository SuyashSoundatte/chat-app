import express, { Express } from "express"
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors({
  origin:"*"
}));

import auth from "./routes/auth.route"
import room from "./routes/room.route"

app.use("/api", auth);
app.use('/api', room);

export default app