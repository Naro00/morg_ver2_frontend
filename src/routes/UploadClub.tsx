import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  position,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaLuggageCart, FaMoneyBill, FaToilet } from "react-icons/fa";
import {
  getAmenities,
  getCategories,
  IUploadClubVariables,
  uploadClub,
} from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory, IClubDetail } from "../types";
import { useNavigate } from "react-router-dom";

interface IForm {
  name: string;
  city: string;
  gu: string;
  price: number;
  locker_room: number;
  toilets: number;
  description: string;
  address: string;
  kind: string;
  amenities: number[];
  category: number;
}

export default function UploadClub() {
  const { register, handleSubmit } = useForm<IUploadClubVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadClub, {
    onSuccess: (data: IClubDetail) => {
      toast({
        status: "success",
        title: "Club created",
        position: "bottom-right",
      });
      navigate(`/clubs/${data.id}`);
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  useHostOnlyPage();
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const onSubmit = (data: IUploadClubVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Club</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>????????? ????????? ??????????????????.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>???</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>ex : ?????????, ?????????, ?????????</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>???</FormLabel>
              <Input
                {...register("gu", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>ex : ?????????, ?????????, ?????????</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>?????? ????????? ??????????????????.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  type={"number"}
                  min={0}
                />
              </InputGroup>
              <FormHelperText>1?????? ?????? ????????? ??????????????????.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Locker rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaLuggageCart />} />
                <Input
                  {...register("locker_room", { required: true })}
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description", { required: true })}
                placeholder="????????? ?????? ??????????????????(????????????, ????????????, ???????????? ??????)"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Event of clubs</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="????????? ??????????????????."
              >
                <option value={"track_and_field"}>??????</option>
                <option value={"ball_game"}>??????</option>
                <option value={"racket_sports"}>?????? ?????????</option>
                <option value={"auatic_sports"}>?????? ?????????</option>
                <option value={"gymnastics"}>??????</option>
                <option value={"ice_sports"}>??????</option>
                <option value={"snow_sports"}>??????</option>
                <option value={"dance"}>??????</option>
                <option value={"gym_sports"}>Gym Sports</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Category of clubs</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="?????? ??????????????? ??????????????????."
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>?????? ????????? ????????? ??????????????????</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"orange"}
              size="lg"
              w={"100%"}
            >
              Upload
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
