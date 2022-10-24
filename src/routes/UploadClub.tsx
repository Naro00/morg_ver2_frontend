import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaLuggageCart, FaMoneyBill, FaToilet } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadClub() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Club</Heading>
          <VStack spacing={5} as="form" mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required type={"text"} />
              <FormHelperText>클럽의 이름을 작성해주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>시</FormLabel>
              <Input required type={"text"} />
              <FormHelperText>ex : 서울시, 용인시, 부산시</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>구</FormLabel>
              <Input required type={"text"} />
              <FormHelperText>ex : 강남구, 서초구, 분당구</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required type={"text"} />
              <FormHelperText>클럽 주소를 작성해주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input type={"number"} min={0} />
              </InputGroup>
              <FormHelperText>1회당 수업 가격을 작성해주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Locker rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaLuggageCart />} />
                <Input type={"number"} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input type={"number"} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="클럽에 대해 설명해주세요(운영시간, 클럽설명, 주의사항 등등)" />
            </FormControl>
            <FormControl>
              <FormLabel>Event of clubs</FormLabel>
              <Select placeholder="종목을 선택해주세요.">
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
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
