'use client';
import { IoAttachSharp, IoSend } from "react-icons/io5";
import { Button, HStack, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { model } from "@/connection";

export default function MainContent() {
    const [prompt, setPrompt] = React.useState('');

    const handleChange = (e: any) => {
        setPrompt(e.target.value);
    }

    const handlePrompting = async () => {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    }

    return (
        <VStack h={'100vh'} position={'relative'} width={'100%'}>
            <VStack>

            </VStack>
            <HStack alignItems={'center'} w={'80%'} justifyContent={'space-between'} position={'fixed'} bottom={0} p={'10px'} bgColor={'white'} rounded={'lg'}>
                <IoAttachSharp size={'20px'} />
                <Textarea rows={1} width={'100%'} resize={'none'} value={prompt} onChange={handleChange} />
                <Button rightIcon={<IoSend size={'25px'} />} rounded={'lg'} disabled={prompt.length === 0} onClick={handlePrompting} />
            </HStack>
        </VStack>
    )
}