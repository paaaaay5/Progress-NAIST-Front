import React from 'react'

export default async function positive_negative_recognition(text='何もない',theme='',level='') {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const URL = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + API_KEY;
    
    const analyzeText = text;
    const headers = 
        {
            "Content-Type": 'application/json',
        }
    const body = {
        'document': {
        'type': 'PLAIN_TEXT',
        'language': 'JA',
        'content': analyzeText
        }
    }
    const otherparam= {
        headers: headers,
        body: JSON.stringify(body),
        method: "POST"
    }
    const res = await fetch(URL,otherparam);
    const data = await res.json();
    console.log(data)
    if (data.documentSentiment.score <= 0.2){
        return false
    }else{
        return true
    };
    }