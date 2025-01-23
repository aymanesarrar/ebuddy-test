"use client";
import { useGetUserQuery } from "@/apis/userApi";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import UserProfile from "@/components/user-profile";

export default function Page() {
  const [fetch, setFetch] = useState(true);
  const { data, isLoading } = useGetUserQuery("", { skip: fetch });

  console.log(data);
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      {isLoading ? (
        <CircularProgress />
      ) : !data ? (
        <Button onClick={() => setFetch(false)} variant="contained">
          fetch
        </Button>
      ) : (
        <UserProfile />
      )}
    </Stack>
  );
}
