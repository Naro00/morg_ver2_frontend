import { useColorModeValue } from "@chakra-ui/react";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IClubProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  gu: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Club({
  pk,
  imageUrl,
  name,
  rating,
  city,
  gu,
  price,
}: IClubProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/clubs/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb={3} rounded="xl">
          {imageUrl ? (
            <Image minH="280" src={imageUrl} />
          ) : (
            <Box minH={"280px"} h="100%" w={"100%"} p={10} bg="green.400" />
          )}
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {gu}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">{price}</Text> / lesson
        </Text>
      </VStack>
    </Link>
  );
}
