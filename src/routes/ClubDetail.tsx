import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaHeart,
  FaList,
  FaLocationArrow,
  FaPencilAlt,
  FaStar,
} from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getAmenities, getClub, getClubReivews } from "../api";
import ReviewModal from "../components/ReviewModal";
import { IAmenity, IClubDetail, IReview } from "../types";
import ReviewPost from "../components/Review";

export default function ClubDetail() {
  const { clubPk } = useParams();
  const { isLoading, data } = useQuery<IClubDetail>([`clubs`, clubPk], getClub);
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { isLoading: isReviewLoding, data: reviewData } = useQuery<IReview[]>(
    [`clubs`, clubPk, `reviews`],
    getClubReivews
  );
  const {
    isOpen: isreviewOpen,
    onClose: onreviewClose,
    onOpen: onreviewOpen,
  } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const btnRef = React.useRef(null);
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 19,
      }}
    >
      <Skeleton height={"43px"} width="40%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={20}
        rounded={"xl"}
        overflow={"hidden"}
        gap={2}
        height={"40vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {data?.photos.slice(0, 5).map((photos, index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={photos.pk}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 4 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"65%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <Heading fontSize={"2xl"}>
              Club hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={"30px"} pt={10}>
            <HStack justifyContent={"flex-start"} w={"100%"}>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>∙</Text>
              <Text>
                {data?.locker_room} locker room
                {data?.locker_room === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={"lg"} src={data?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Container mt={16} maxW="container.lg" marginX={"none"} pb={10}>
          <Heading fontSize={"xl"} mb={5}>
            <Skeleton isLoaded={!isLoading} width={"55%"} height={"30%"}>
              <HStack>
                <FaLocationArrow />
                <Text>Address</Text>
              </HStack>
              <Text fontWeight={"normal"} pt={5} fontSize={"md"}>
                {data?.address}
              </Text>
            </Skeleton>
          </Heading>
        </Container>
      </Box>
      <Box mt={10}>
        <Container mt={16} maxW="container.lg" marginX={"none"} pb={10}>
          <Heading fontSize={"xl"} mb={5}>
            <Skeleton isLoaded={!isLoading} width={"55%"} height={"30%"}>
              <HStack>
                <FaPencilAlt />
                <Text>Description</Text>
              </HStack>
              <List spacing={3}>
                <ListItem fontWeight={"normal"} pt={5} fontSize={"md"}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {data?.description}
                </ListItem>
                <ListItem fontWeight={"normal"} pt={5} fontSize={"md"}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  운영시간 : {data?.open_time} to {data?.close_time}
                </ListItem>
              </List>
            </Skeleton>
          </Heading>
        </Container>
      </Box>
      <Box mt={10}>
        <Container mt={16} maxW="container.lg" marginX={"none"} pb={10}>
          <Heading fontSize={"xl"} mb={5}>
            <Skeleton isLoaded={!isLoading} width={"55%"} height={"30%"}>
              <HStack>
                <FaPencilAlt />
                <Text>Amenities & Facilities</Text>
              </HStack>
              {data?.amenities.map((amenity) => (
                <Box pt={5} key={amenity.pk}>
                  {data?.amenities.length > 0 ? (
                    <List fontSize={"md"} fontWeight={"normal"} spacing={3}>
                      <ListItem>
                        <ListIcon as={FaHeart} color={"orange.300"} />
                        {amenity.name}
                      </ListItem>
                    </List>
                  ) : null}
                </Box>
              ))}
            </Skeleton>
          </Heading>
        </Container>
      </Box>
      <Box mt={10}>
        <Heading fontSize={"xl"} mb={5}>
          <Skeleton isLoaded={!isLoading} width={"55%"} height={"30px"}>
            <HStack>
              <FaStar /> <Text>{data?.rating}</Text>
              <Text>∙</Text>
              <Text>
                {reviewData?.length} review{reviewData?.length === 1 ? "" : "s"}
              </Text>
            </HStack>
            <Container mt={16} maxW="container.lg" marginX={"none"} pb={40}>
              <Grid gap={20} templateColumns={"1fr 1fr"}>
                {reviewData?.slice(0, 4).map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
              <ReviewPost />
              <Stack mt={10} width={"100%"}>
                <Button
                  colorScheme={"yellow"}
                  fontSize={"md"}
                  as="b"
                  ref={btnRef}
                  onClick={onreviewOpen}
                >
                  More Rievews
                </Button>
              </Stack>
              <ReviewModal isOpen={isreviewOpen} onClose={onreviewClose} />
            </Container>
          </Skeleton>
        </Heading>
      </Box>
    </Box>
  );
}
