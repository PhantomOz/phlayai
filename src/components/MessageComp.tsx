import { Stack, Text } from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown'

export default function MessageComp({ message, isSender }: { message: string, isSender: boolean }) {
    return (
        <Stack>
            <ReactMarkdown >
                {message}
            </ReactMarkdown>

        </Stack>
    )
}