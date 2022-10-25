import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaUserAstronaut, FaLock, FaEnvelope } from "react-icons/fa";
import SocialLogin from "./socialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Ifrom {
  username: string;
  password: string;
  password1: string;
  email: string;
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required("이름은 반드시 입력해주세요."),
  username: yup.string().required("Username은 반드시 입력해주세요."),
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 반드시 입력해주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자리 이상입니다.")
    .max(18, "비밀번호는 최대 15자리 입니다.")
    .required("비밀번호는 반드시 입력해주세요."),
  password1: yup
    .string()
    .min(8, "비밀번호는 최소 8자리 이상입니다.")
    .max(18, "비밀번호는 최대 15자리 입니다.")
    .required("비밀번호 확인은 반드시 입력해주세요."),
});

export default function SingUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Ifrom>({ resolver: yupResolver(schema), mode: "onChange" });
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(userSignUp, {
    onSuccess: () => {
      toast({
        title: "Have a nice Morg",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
  });
  const onSubmit = ({ username, password, password1, name, email }: Ifrom) => {
    mutation.mutate({ username, password, password1, name, email });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", {
                  required: "Please write a name",
                })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Please write a email",
                })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAstronaut />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                variant={"filled"}
                placeholder="Password"
                type="password"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password1?.message)}
                {...register("password1", {
                  required: "Please write a confirm password",
                })}
                variant={"filled"}
                placeholder="Confirm Password"
                type="password"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"orange"}
            w="100%"
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
