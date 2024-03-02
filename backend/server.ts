import express from "express";
import cors from "cors";
import { generateThumbnail } from "./thumbnailGenerator";

const app = express();
const port = process.env.PORT || 3001;
console.log("port3001");
app.use(cors());
app.use(express.json());

app.post("/thumbnail", async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    const thumbnail = await generateThumbnail(videoUrl);
    res.send({ thumbnail });
  } catch (error) {
    const videoUrl = req.body.videoUrl;
    res
      .status(500)
      .send([{ error: "Failed to generate thumbnail" }, { videoUrl }]);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
