import React, { useState } from 'react';
import Accordion from './Accordion';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CloseIcon from '@mui/icons-material/Close';


const Textarea = () => {
    const [input, setInput] = useState("");
    const [isSearched, setSearched] = useState(false);
    const [voiceActiveStyle, setVoiceActiveStyle] = useState("");
    const [speakerActiveStyle, setSpeakerActiveStyle] = useState("");

    function SearchResult() {

        if (input != "") {
            setSearched(prev => !prev);
            console.log(input)
        }
    }

    const handleFocus = () => {
        if (isSearched) setSearched(prev => !prev);
    }

    const clearText = () => {
        setSearched(false);
        setInput("");
    }

    const handlePronunciation = () => {
        // new SpeechSynthesisUtterance object
        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = input;
        speech.volume = 0.9;
        // event after text has been spoken
        speech.onend = function () {
            // alert('Speech has finished');
            setSpeakerActiveStyle("")
        }
        setSpeakerActiveStyle("speaker_btn")
        window.speechSynthesis.speak(speech);
    }

    const handleVoiceInput = () => {
        console.log("voice")
        var speechRecognition = window.webkitSpeechRecognition
        var recognition = new speechRecognition()
        var content = ''

        recognition.continuos = true

        recognition.onstart = function () {
            setVoiceActiveStyle("voice_btn")
            console.log("start")
        }

        recognition.onspeechend = function () {
            setVoiceActiveStyle("")
        }
        recognition.onerror = function () {
        }
        recognition.onresult = function (event) {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript
            content += transcript
            setInput(content)
        }
        recognition.start()
    }


    return (
        <>
            <div className="card_div">
                <div className="text_div">
                    <textarea className="text_area" value={input} onChange={(e) => setInput(e.target.value)} onFocus={handleFocus} placeholder="Search Here...">
                    </textarea>
                    <div className="button_container">
                        <button className={`search_btn ${voiceActiveStyle}`} onClick={handleVoiceInput} ><KeyboardVoiceIcon /></button>
                        <button className={`search_btn ${speakerActiveStyle}`} onClick={handlePronunciation}><VolumeUpIcon /></button>
                        <button className="search_btn" onClick={SearchResult}><SearchIcon /></button>
                    </div>
                    <button className="close_btn" onClick={clearText}>
                        {((input != "") && <CloseIcon />)}
                    </button>

                </div>
            </div>
            <br></br>

            {(isSearched) && <Accordion data={input} />}
        </>
    )
}
export default Textarea;