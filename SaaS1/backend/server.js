import "dotenv/config";
import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generate.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/generate", generateRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const server = app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\nPort ${PORT} zaten kullanımda. Eski işlemi kapatın: netstat -ano | findstr :${PORT}  ardından taskkill /PID <PID> /F\n`);
  }
  throw err;
});
