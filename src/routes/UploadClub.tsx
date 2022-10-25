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
              <FormHelperText>클럽의 이름을 작성해주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>시</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>ex : 서울시, 용인시, 부산시</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>구</FormLabel>
              <Input
                {...register("gu", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>ex : 강남구, 서초구, 분당구</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>클럽 주소를 작성해주세요.</FormHelperText>
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
              <FormHelperText>1회당 수업 가격을 작성해주세요.</FormHelperText>
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
                placeholder="클럽에 대해 설명해주세요(운영시간, 클럽설명, 주의사항 등등)"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Event of clubs</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="종목을 선택해주세요."
              >
                <option value={"track_and_field"}>육상</option>
                <option value={"ball_game"}>구기</option>
                <option value={"racket_sports"}>라켓 스포츠</option>
                <option value={"auatic_sports"}>수상 스포츠</option>
                <option value={"gymnastics"}>체조</option>
                <option value={"ice_sports"}>빙상</option>
                <option value={"snow_sports"}>설상</option>
                <option value={"dance"}>무용</option>
                <option value={"gym_sports"}>Gym Sports</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Category of clubs</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="세부 카테고리를 선택해주세요."
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
              <Text color={"red.500"}>빠진 부분이 없는지 확인해주세요</Text>
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
