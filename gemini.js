const PORT = 8000;
const express = require("express")
const cors = require("cors")
const app = express()



const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");


const apiKey = "AIzaSyDo0dRmgVJjhfjH5L3nkgzxhhR7sLXK2Ow";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp-image-generation",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [
    "image",
    "text",
  ],
  responseMimeType: "text/plain",
};

app.use(express.json())
app.use(cors())
app.post("/response", async (req, res) => {
  try {
    const  message  = req.body.message;
    if (!message) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(message);
    const candidates = result.response.candidates;

    const outputs = [];

    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          const ext = mime.extension(part.inlineData.mimeType);
          const filename = `output_${candidate_index}_${part_index}.${ext}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
          outputs.push({ type: "image", filename });
        } else if (typeof part.text === "string") {
          outputs.push({ type: "text", text: part.text });
        }
      }
    }

    res.json({ success: true, outputs });
  } catch (error) {
    console.error("Error in /response:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log("Server running on port " + PORT));