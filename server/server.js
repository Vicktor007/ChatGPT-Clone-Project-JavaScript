// const express = require('express');
import express  from 'express';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.get('/api', async (req, res) => {
    const API_KEY = process.env.API_KEY; // Access your API key here
    const API_URL = "https://api.openai.com/v1/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            prompt: req.query.prompt,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
