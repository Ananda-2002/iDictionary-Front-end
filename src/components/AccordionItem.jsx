import React, { useState } from 'react'
import { Markup } from 'interweave';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
const AccordionItem = (props) => {
    const { title, body, isCollapsed } = props;
    let contentLength = 0;
    const [showData, setShowData] = useState(isCollapsed)
    const [showNum, setShowNum] = useState(4);

    let bodyContainer = ''
    const arrayDestructors = (fullArr) => {
        if (typeof (fullArr) == 'string') {
            return fullArr;
        }
        let arr = fullArr.slice(0, showNum);
        let res = '<br>'
        Object.keys(arr).forEach(e => res += (e + " : " + arr[e] + '<br>'))
        return (res);
    }

    if (typeof (body) == 'string') {
        bodyContainer = body;
    }
    else if (body.constructor.name == "Array") {
        contentLength = body.length;
        let slicedBody = body.slice(0, showNum);
        Object.keys(slicedBody).forEach(e => bodyContainer += (e + " : " + (slicedBody[e]) + '<br>'))
    }
    else if (typeof (body) == 'object') {
        Object.keys(body).forEach(e => contentLength += body[e].length);
        Object.keys(body).forEach(e => bodyContainer += (`<strong>${e}</strong>` + " : " + arrayDestructors(body[e]) + '<br>'))

    }
    const handleClick = () => {
        setShowData(prev => !prev)
    }


    const allVoicesObtained = new Promise(function (resolve, reject) {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length !== 0) {
            resolve(voices);
        } else {
            window.speechSynthesis.addEventListener("voiceschanged", function () {
                voices = window.speechSynthesis.getVoices();
                resolve(voices);
            });
        }
    });




    const handlePronunciation = () => {
        // new SpeechSynthesisUtterance object
        console.log(bodyContainer)
        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = bodyContainer;
        speech.volume = 0.9;
        // event after text has been spoken
        speech.onend = function () {
            // alert('Speech has finished');
        }
        // allVoicesObtained.then(voices => console.log("All voices:", voices));
        window.speechSynthesis.speak(speech);
    }


    const copyTextToClipBoard = () => {
        console.log(bodyContainer)
        const textArea = document.createElement("textarea");
        textArea.value = bodyContainer
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }


    return (
        <>
            <div className="accordion_item">
                <div className="accordion_title">
                    <button className="accordion_btn" type="button" onClick={handleClick}>{(showData) ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineOutlinedIcon />}</button>
                    <p>{title}</p>
                </div>
                {showData &&
                    <div className="accordion_body">
                        <Markup content={bodyContainer} />
                        {(typeof (body) == 'string') &&
                            <div className="accordion_btn_container">
                                <button className="copy_btn" onClick={handlePronunciation}><VolumeUpIcon fontSize="small" /></button>
                                <button className="copy_btn" onClick={copyTextToClipBoard}><ContentCopyIcon fontSize="small" /></button>
                            </div>
                        }
                    </div>
                }
                {showData && ((typeof (body) != 'string' && title !== "Parts of Speech") && ((showNum >= contentLength) ? <button className="show_more_btn" onClick={() => setShowNum(4)}>Show Less ...</button> : <button className="show_more_btn" onClick={() => setShowNum(prev => prev + 4)}>Show More ...</button>))}
            </div>
        </>
    )
}
export default AccordionItem;