import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getClub, getClubReivews } from "../api";
import ReviewModal from "../components/ReviewModal";
import { IClubDetail, IReview } from "../types";

export default function ClubDetail() {
  const { clubPk } = useParams();
  const { isLoading, data } = useQuery<IClubDetail>([`clubs`, clubPk], getClub);
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
      <Skeleton height={"43px"} width="30%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded={"xl"}
        overflow={"hidden"}
        gap={2}
        height={"40vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={data?.photos[index].file}
              />
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
              <Stack mt={10} width={"60%"}>
                <Button
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
