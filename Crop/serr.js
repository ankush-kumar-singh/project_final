import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Load environment variables from a .env file in development
dotenv.config();

// Health check
app.get("/", (req, res) => res.send({ status: "ok" }));

app.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/crop-disease-2rilx/4",
      // prefer env var; fallback to embedded key if not set
      params: { api_key: process.env.ROBOFLOW_API_KEY || "5UUeT25poQRore89rnRg" },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
   
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Roboflow API error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
