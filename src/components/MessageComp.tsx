import { Stack, Text } from "@chakra-ui/react";

export default function MessageComp({ message, isSender }: { message: string, isSender: boolean }) {
    return (
        <Stack>
            <Text>
                {message}
            </Text>
        </Stack>
    )
}