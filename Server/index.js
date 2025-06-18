import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT | 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URL;
console.log("URL", uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}
run()

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
