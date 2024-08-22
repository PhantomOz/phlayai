import { IoAttachSharp, IoSend } from "react-icons/io5";
import { HStack, InputGroup, InputLeftElement, InputRightElement, Textarea, VStack } from "@chakra-ui/react";

export default function MainContent() {
    return (
        <VStack h={'100vh'} position={'relative'} width={'100%'}>
            <VStack>

            </VStack>
            <HStack alignItems={'center'} w={'80%'} justifyContent={'space-between'} position={'fixed'} bottom={0} p={'10px'} bgColor={'white'} rounded={'lg'}>
                <IoAttachSharp size={'20px'} />
                <Textarea rows={1} width={'100%'} resize={'none'} />
                <IoSend size={'25px'} />
            </HStack>
        </VStack>
    )
}