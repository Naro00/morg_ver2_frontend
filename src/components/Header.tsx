import { FaHeart, FaMoon } from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  return (
    <HStack
      justifyContent={"space-between"}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      <Box color="orange.500">
        <Link to={"/"}>
          <FaHeart size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <Button onClick={onLoginOpen} colorScheme={"orange"} variant={"ghost"}>
          Log in
        </Button>
        <Button onClick={onSignUpOpen} colorScheme={"orange"} variant={"ghost"}>
          Sign up
        </Button>
        <IconButton
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<FaMoon />}
        />
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
