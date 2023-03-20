import express from "express";
import { run } from "../src/run";

const app = express();
app.use(
  "/", express.raw({ type: "*/*" })
);
app.use(express.json());
const port = process.env.PORT;

app.post("/", async (req, res) => {
  try {
    const orderRes = await run(req);
    res.send({"success": orderRes});
  } catch (err) {
    console.error(err);
    res.send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
