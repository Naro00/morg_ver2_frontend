import { Box, Container, Grid, HStack, IconButton } from "@chakra-ui/react";
import { MdSportsSoccer } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getClubs } from "../api";
import Club from "../components/Club";
import RoomSkeleton from "../components/RoomSkeleton";
import { IClubList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IClubList[]>(["clubs"], getClubs);
  return (
    <Box>
      <Grid
        mt={10}
        px={{
          base: 10,
          lg: 19,
        }}
        columnGap={4}
        rowGap={8}
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
      >
        {isLoading ? (
          <>
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
          </>
        ) : null}
        {data?.map((club) => (
          <Club
            key={club.pk}
            pk={club.pk}
            isOwner={club.is_owner}
            imageUrl={club.photos[0]?.file}
            name={club.name}
            rating={club.rating}
            city={club.city}
            gu={club.gu}
            price={club.price}
          />
        ))}
      </Grid>
    </Box>
  );
}
