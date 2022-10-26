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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IpostReviewVariables, postClubReview } from "../api";
import { IReview } from "../types";

export default function ReviewPost() {
  const { register, handleSubmit, reset } = useForm<IReview>();
  const { clubPk } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(postClubReview, {
    onSuccess: (data: IReview) => {
      toast({
        status: "success",
        title: "Review uploaded",
        position: "bottom-right",
      });
      navigate(`/clubs/${clubPk}`);
    },
  });
  const onSubmit = (data: IpostReviewVariables) => {
    mutation.mutate(data);
  };
  return (
    <Box>
      <Stack mt={10} width={"100%"} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl {...register("rating")}>
          <FormHelperText fontSize={"xs"}>
            클럽 활동에 대해서 얼마나 만족하시나요?
          </FormHelperText>
          <NumberInput size={"sm"} w={"40%"} defaultValue={1} min={1} max={5}>
            <NumberInputField />
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
