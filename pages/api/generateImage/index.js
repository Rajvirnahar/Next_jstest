
import { json } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    console.log(req.body);

    
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    try {
        const image = await openai.images.generate({
            model: "dall-e-3", 
            prompt: prompt});
       
         const imageUrl = image.data[0].url;
         const finalData = image.data
         
   
       res.status(200).json({ imageUrl, finalData })
    }
    catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Error generating image', details: error.message });
    }
    

  
}




