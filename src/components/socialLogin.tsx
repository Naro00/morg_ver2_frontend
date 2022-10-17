import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as="b"
        >
          OR
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button w="100%" leftIcon={<FaComment />} colorScheme={"yellow"}>
          Login with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
