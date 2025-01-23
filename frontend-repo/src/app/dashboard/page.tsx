"use client";
import { useGetUserQuery } from "@/apis/userApi";
import { Button, Stack } from "@mui/material";
import { useEffect } from "react";

export default function Page() {
  const { data, isLoading } = useGetUserQuery("");
  if (isLoading) return <div>isLoading ...</div>;
  console.log(data);
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <h1>Dashboard</h1>
      <Button variant="contained">fetch</Button>
    </Stack>
  );
}
