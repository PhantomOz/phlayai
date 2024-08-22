'use client';
import { IoAttachSharp, IoSend } from "react-icons/io5";
import { Button, HStack, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { model } from "@/connection";
import MessageComp from "./MessageComp";

export default function MainContent() {
    const [prompt, setPrompt] = React.useState('');
    const [messages, setMessages] = React.useState<any>([]);

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

    const handleChange = (e: any) => {
        setPrompt(e.target.value);
    }

    const handlePrompting = async () => {
        setMessages([...messages, { message: prompt, isSender: true }]);
    }

    return (
        <VStack h={'100vh'} position={'relative'} width={'100%'}>
            <VStack>
                {messages?.map((message: any, index: any) => <MessageComp key={index} message={message.message} isSender={message.isSender} />)}
            </VStack>
            <HStack alignItems={'center'} w={'80%'} justifyContent={'space-between'} position={'fixed'} bottom={0} p={'10px'} bgColor={'white'} rounded={'lg'}>
                <IoAttachSharp size={'20px'} />
                <Textarea rows={1} width={'100%'} resize={'none'} value={prompt} onChange={handleChange} />
                <Button rightIcon={<IoSend size={'25px'} />} rounded={'lg'} disabled={prompt.length === 0} onClick={handlePrompting} />
            </HStack>
        </VStack>
    )
}