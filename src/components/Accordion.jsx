import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import AccordionItem from "./AccordionItem";
const Accordion = (props) => {
    const [callComponent, setCallComponent] = useState(false)
    const [apiError, setApiError] = useState(false);
    const [result, setResult] = useState({
        word: [],
        corrected_word: [],
        synonyms: [],
        antonyms: [],
        example: [],
        definition: [],
        translation: [],
        partsOfSpeech: []
    })

    const word = props.data;
    const getData = async () => {
        const config = {
            text: word,
            from: "English",
            to: "Bengali"
        }
        const headers = new Headers({
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify(config).length
        })

        try {
            const response = await fetch('http://localhost:8000/api/get-all',
                {
                    mode: 'cors',
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(config)
                });

            const res = await response.json();
            console.log({ res })
            if (res.success) {
                setResult({
                    word: res.payload.data.word,
                    corrected_word: res.payload.data.corrected_word,
                    synonyms: res.payload.data.synonyms,
                    antonyms: res.payload.data.antonyms,
                    definition: res.payload.data.definition,
                    example: res.payload.data.example,
                    translation: res.payload.data.translation,
                    partsOfSpeech: res.payload.data.parts_of_speech
                })
                setCallComponent(true)
            } else {
                setApiError(true)
            }

        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData();
    }, [word]);

    const SkeletonStructure = () => {
        const skeletonStyle = {
            borderRadius: '10px'
        }
        return (
            <>
                <Skeleton variant="rectangular" animation="wave" height={70} style={skeletonStyle} /><br />
                <Skeleton variant="rectangular" animation="wave" height={70} style={skeletonStyle} /><br />
            </>
        )
    }
    return (
        <>

            <div className="card_div">
                {/* <AccordionItem title="Correction" body={"Corrected"} isCollapsed={true} />
                <AccordionItem title="Translation" body={"Corrected"} isCollapsed={true} />
                <AccordionItem title="Definition" body={"corrected"} />
                <AccordionItem title="Synonyms" body={"Corrected"} />
                <AccordionItem title="Antonyms" body={"Corrected"} />
                <AccordionItem title="Parts of Speech" body={"Corrected"} /> */}
                {(apiError) ? <p>Some Error Occurs :(</p> :
                    <>
                        {(callComponent) ? <AccordionItem title="Corrected Word" body={result.corrected_word} isCollapsed={true} /> : <SkeletonStructure />}

                        {(callComponent) ? <AccordionItem title="Translation" body={result.translation} isCollapsed={true} /> : <SkeletonStructure />}

                        {(result.definition != 0) && ((callComponent) ? <AccordionItem title="Definition" body={result.definition} isCollapsed={false} /> : <SkeletonStructure />)}

                        {(result.example != 0) && ((callComponent) ? <AccordionItem title="Example" body={result.example} isCollapsed={false} /> : <SkeletonStructure />)}

                        {(result.synonyms != 0) && ((callComponent) ? <AccordionItem title="Synonyms" body={result.synonyms} isCollapsed={false} /> : <SkeletonStructure />)}

                        {(result.antonyms != 0) && ((callComponent) ? <AccordionItem title="Antonyms" body={result.antonyms} isCollapsed={false} /> : <SkeletonStructure />)}

                        {(callComponent) ? <AccordionItem title="Parts of Speech" body={result.partsOfSpeech} /> : <SkeletonStructure />}
                    </>
                }
            </div>
        </>
    )
}
export default Accordion;