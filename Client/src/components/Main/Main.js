import React, { useState } from "react";
import './Main.css';
import axios from 'axios';

const Main = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [audioUrl, setAudioUrl] = useState(true);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleTranslate =async () => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'en');
        encodedParams.set('target_language', 'hi');
        encodedParams.set('text', `${inputText}`);

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '8322e2551dmshc519e0650b399b6p14f462jsna11eb86c11ba',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            // setOutputText(response.data)
            setOutputText(response.data.data.translatedText)
        } catch (error) {
            console.error(error);
        }
    };

    const playAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
            setAudioPlaying(true);
            audio.addEventListener('ended', () => {
                setAudioPlaying(false);
            });
        }
    };

    return (
        <main className="main-section">
            <div className="input-section">
                <h2>English Text</h2>
                <textarea
                    placeholder="Enter English text..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <button onClick={handleTranslate}>Translate</button>
            </div>
            <div className="output-section">
                <h2>Translated Hindi Text</h2>
                <div>
                    <p>{outputText}</p>
                </div>
                {audioUrl && (
                    <button onClick={playAudio}>
                        {audioPlaying ? 'Playing...' : 'Play Audio'}
                    </button>
                )}
            </div>
        </main>
    );
}

export default Main;
