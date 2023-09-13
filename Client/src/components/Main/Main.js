import React from "react";
import { useState } from "react";
import './Main.css'
import Background from './background.png'

const Main = () => {

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [audioUrl, setAudioUrl] = useState(true);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleTranslate = () => {
        // Make an API request here to translate inputText to Hindi
        fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ englishText: inputText }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOutputText(data.translation);
                setAudioUrl(data.audioUrl);
            })
            .catch((error) => console.error('Error translating text:', error));
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
        <>
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
        </>
    )
}

export default Main;