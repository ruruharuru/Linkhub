import React, { useState } from "react";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const fetchThumbnail = async () => {
    try {
      const response = await fetch("http://localhost:3001/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });
      const data = await response.json();
      setThumbnailUrl(data.thumbnail);
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      alert("Failed to fetch thumbnail");
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
      />
      <button onClick={fetchThumbnail}>Get Thumbnail</button>
      {thumbnailUrl && (
        <div>
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            style={{ marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
