import express from "express";
import {connectToPg} from "./db/index"
import router from "./routes/routes";

// extend the req object
declare global {
    namespace Express {
      interface Request {
        user: any
      }
    }
  }

const app = express();
app.use(express.json());

connectToPg();



app.use("/api",router)

const port = process.env.PORT || 5005;


app.listen(port,() => {
    console.log(`app listening on port ${port}`);
    
})