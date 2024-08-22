import { Avatar, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown'

export default function MessageComp({ message, isSender }: { message: string, isSender: boolean }) {
    return (
        <Stack dir="col" maxW={'55%'} alignItems={'flex-start'} alignSelf={isSender ? 'flex-end' : 'flex-start'}>
            <HStack>
                {isSender && <Avatar name="User" />}
                <VStack alignItems={'flex-start'}>
                    <ReactMarkdown >
                        {message}
                    </ReactMarkdown>
                </VStack>
            </HStack>
        </Stack>
    )
}