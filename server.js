const PORT = 8000; 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express()
app.use(cors());
app.use(express.json());

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY);


app.post('/gemini', async (req, res) => {
    const { message, history } = req.body;
    console.log(message, history, process.env.GOOGLE_KEY);
    


    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat = model.startChat({
        history: history,
    })

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
    res.send(text);

   
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
