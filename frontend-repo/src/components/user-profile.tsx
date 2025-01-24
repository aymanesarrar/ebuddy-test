"use client";
import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { IUser } from "shared";
import PersonIcon from "@mui/icons-material/Person";
import { useUpdateUserMutation } from "@/apis/userApi";
import toast from "react-hot-toast";

export default function UserProfile(user: Partial<IUser>) {
  const [updateUser, { isError, isSuccess, isLoading }] =
    useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    email: user.email || "",
    disabled: user.disabled || false,
  });

  const handleInputChange = (field: keyof typeof formData) => (event: any) => {
    const value =
      field === "disabled" ? event.target.checked : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully");
    }
    if (isError) {
      toast.error("Failed to update user");
    }
  }, [isError, isSuccess]);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const saveChanges = async () => {
    await updateUser(formData).unwrap();

    setIsEditing(false);
  };

  return (
    <Stack border="1px solid black" padding={2} gap={2}>
      <Stack direction="row" gap={2}>
        <PersonIcon />
        <h1>User Profile</h1>
      </Stack>
      <form>
        <Stack gap={2}>
          <div>
            <TextField
              label="Display Name"
              value={formData.displayName}
              onChange={handleInputChange("displayName")}
              fullWidth
              disabled={!isEditing}
            />
          </div>
          <div>
            <TextField
              label="Email"
              value={formData.email}
              onChange={handleInputChange("email")}
              fullWidth
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>
              Disabled:{" "}
              <Switch
                checked={formData.disabled}
                onChange={handleInputChange("disabled")}
                disabled={!isEditing}
              />
            </label>
          </div>
        </Stack>
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
          {isEditing ? (
            <>
              {!isLoading ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveChanges}
                >
                  Save
                </Button>
              ) : (
                <CircularProgress />
              )}
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleEditing}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditing}>
              Edit
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
