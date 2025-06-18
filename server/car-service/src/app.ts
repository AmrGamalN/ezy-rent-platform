import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from ITEM service");
});

app.listen(PORT, () => {
  console.log(`✅ Item service running on port ${PORT}`);
});
