"use client";
import { useLogoutUserMutation } from "@/apis/userApi";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const [logout, { isSuccess }] = useLogoutUserMutation();
  const handleLogout = async () => {
    await logout(null).unwrap();
  };
  useEffect(() => {
    if (isSuccess) {
      router.replace("/login");
    }
  }, [isSuccess]);
  return (
    <div>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
