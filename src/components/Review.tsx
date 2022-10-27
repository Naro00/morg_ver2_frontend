import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClub,
  getClubReivews,
  IpostReviewVariables,
  postClubReview,
} from "../api";
import { IClubDetail, IReview } from "../types";

export default function ReviewPost() {
  const { clubPk } = useParams();
  const { register, handleSubmit, reset } = useForm<IpostReviewVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(postClubReview, {
    onSuccess: (data: IReview) => {
      toast({
        status: "success",
        title: "Review uploaded",
        position: "bottom-right",
      });
      reset();
    },
  });
  const onSubmit = ({
    payload,
    rating,
    user,
    clubPk,
  }: IpostReviewVariables) => {
    mutation.mutate({ payload, rating, user, clubPk });
  };
  return (
    <Box>
      <Stack mt={10} width={"100%"} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text>{}</Text>
        <FormControl>
          <FormHelperText fontSize={"xs"}>
            클럽 활동에 대해서 얼마나 만족하시나요?
          </FormHelperText>
          <NumberInput size={"sm"} w={"40%"} defaultValue={1} min={1} max={5}>
            <NumberInputField {...register("rating")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Textarea
          {...register("payload")}
          placeholder="솔직한 평가를 남겨주세요."
        ></Textarea>
        <Button
          isLoading={mutation.isLoading}
          type="submit"
          w={"40%"}
          colorScheme="orange"
        >
          후기 저장
        </Button>
      </Stack>
    </Box>
  );
}
