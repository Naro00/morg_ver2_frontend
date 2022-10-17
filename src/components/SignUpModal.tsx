import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaUserAstronaut, FaLock, FaEnvelope } from "react-icons/fa";
import SocialLogin from "./socialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SingUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Name" />
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaEnvelope />
                    </Box>
                  }
                />
                <Input variant={"filled"} placeholder="Email" />
              </InputGroup>
            </InputGroup>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAstronaut />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>
          <Button mt={4} colorScheme={"orange"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
