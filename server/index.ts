// const express = require("express");
import express, { Express, Request, Response } from "express";

const port = 8000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO FROM new!! EXPRESS");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
