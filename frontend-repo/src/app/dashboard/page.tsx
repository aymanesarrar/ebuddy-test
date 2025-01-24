"use client";
import { useGetUserQuery } from "@/apis/userApi";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import UserProfile from "@/components/user-profile";
import Logout from "@/components/logout";

export default function Page() {
  const [fetch, setFetch] = useState(true);
  const { data, isLoading, isFetching } = useGetUserQuery(null, {
    skip: fetch,
  });

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack gap={2}>
        {isLoading || isFetching ? (
          <CircularProgress />
        ) : !data ? (
          <Button onClick={() => setFetch(false)} variant="contained">
            fetch
          </Button>
        ) : (
          <UserProfile
            displayName={data?.displayName}
            email={data?.email}
            disabled={data?.disabled}
          />
        )}
        <Logout />
      </Stack>
    </Stack>
  );
}
