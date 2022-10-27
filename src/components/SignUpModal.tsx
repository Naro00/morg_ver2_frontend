import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaUserAstronaut, FaLock, FaEnvelope } from "react-icons/fa";
import SocialLogin from "./socialLogin";
import { isError, useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../api";
import { MdPassword, MdSentimentSatisfiedAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

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
  username: yup.string().required("아이디는 반드시 입력해주세요."),
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 반드시 입력해주세요."),
  password: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "비밀번호는 8자 이상이어야 하고, 하나 이상의 영문 대문자, 숫자와 특수문자를 포함해야 합니다."
    )
    .min(8, "비밀번호는 최소 8자리 이상입니다.")
    .max(18, "비밀번호는 최대 15자리 입니다.")
    .required("비밀번호는 반드시 입력해주세요."),
  password1: yup
    .string()
    .required("비밀번호 확인은 반드시 입력해주세요.")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

export default function SingUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Ifrom>({ resolver: yupResolver(schema), mode: "onChange" });
  const [error, setError] = useState(null);
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
            <VStack>
              <Box>
                {errors.name && (
                  <Text
                    pr={40}
                    color={"red.600"}
                    fontSize={"smaller"}
                    fontWeight={"thin"}
                  >
                    {errors.name.message}
                  </Text>
                )}
              </Box>
            </VStack>
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
            <VStack>
              <Box>
                {errors.email && (
                  <Text
                    pr={40}
                    color={"red.600"}
                    fontSize={"smaller"}
                    fontWeight={"thin"}
                  >
                    {errors.email.message}
                  </Text>
                )}
              </Box>
            </VStack>
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
                placeholder="ID"
              />
            </InputGroup>
            <VStack>
              <Box>
                {errors.username && (
                  <Text
                    pr={40}
                    color={"red.600"}
                    fontSize={"smaller"}
                    fontWeight={"thin"}
                  >
                    {errors.username.message}
                  </Text>
                )}
              </Box>
            </VStack>
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
            <VStack>
              <Box>
                {errors.password && (
                  <Text
                    pr={40}
                    color={"red.600"}
                    fontSize={"smaller"}
                    fontWeight={"thin"}
                  >
                    {errors.password.message}
                  </Text>
                )}
              </Box>
            </VStack>
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
            <VStack>
              <Box>
                {errors.password1 && (
                  <Text
                    pr={40}
                    color={"red.600"}
                    fontSize={"smaller"}
                    fontWeight={"thin"}
                  >
                    {errors.password1.message}
                  </Text>
                )}
              </Box>
            </VStack>
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
