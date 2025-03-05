import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const MessageSchema = new mongoose.Schema({ name: String, email: String, message: String });
const Message = mongoose.model("Message", MessageSchema);

// API Endpoint to Store Messages
app.post("/contact", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
