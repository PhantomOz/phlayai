'use client';
import { IoAttachSharp, IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { Button, HStack, IconButton, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { model } from "@/connection";
import MessageComp from "./MessageComp";
import useSpeechToText from "react-hook-speech-to-text";

export default function MainContent() {
    const [prompt, setPrompt] = React.useState('');
    const [messages, setMessages] = React.useState<any>([]);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    React.useEffect(() => {

        async function sendPrompt() {
            setPrompt('');
            if (prompt.length != 0) {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                setMessages([...messages, { message: text, isSender: false }]);
                console.log(response);
            }
        }
        sendPrompt();
    }, [messages]);

    const [isAnimating, setIsAnimating] = useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (isRecording) {
                setIsAnimating(!isAnimating);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isAnimating, isRecording]);

    React.useEffect(() => {
        console.log(interimResult);
        console.log(results);
        console.log(error);
        if (interimResult !== undefined) {
            setPrompt(interimResult);
        }
    }, [interimResult, results, error]);

    const handleChange = (e: any) => {
        setPrompt(e.target.value);
    }

    const handlePrompting = async () => {
        setMessages([...messages, { message: prompt, isSender: true }]);
    }

    const handleMic = () => {
        if (!isRecording) {
            startSpeechToText();
        } else {
            stopSpeechToText();
            setIsAnimating(false);
        }
    }

    return (
        <VStack h={'90vh'} position={'relative'} width={'100%'} overflowY={'hidden'} p={'20px'}>
            <VStack overflowY={'auto'} height={'90vh'}>
                {messages?.map((message: any, index: any) => <MessageComp key={index} message={message.message} isSender={message.isSender} />)}
            </VStack>
            <HStack alignItems={'center'} w={'80%'} justifyContent={'space-between'} position={'fixed'} bottom={20} p={'10px'} bgColor={'white'} rounded={'lg'}>
                <IoAttachSharp size={'20px'} />
                <Textarea rows={1} width={'100%'} resize={'none'} value={prompt} onChange={handleChange} placeholder={isRecording ? 'Listening' : 'Enter a prompt here'} />
                <IconButton aria-label="send" icon={<IoSend size={'25px'} />} rounded={'lg'} disabled={prompt.length === 0} onClick={handlePrompting} />
                <IconButton aria-label="record prompt" color={isAnimating ? 'blue.500' : 'gray[500]'} icon={<FaMicrophone size={'25px'} />} rounded={'lg'} disabled={prompt.length === 0} onClick={handleMic} transform={isAnimating ? 'scale(1.2)' : 'scale(1)'} transition="transform 0.3s ease-in-out" />
            </HStack>
        </VStack >
    )
}