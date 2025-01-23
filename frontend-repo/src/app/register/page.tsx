"use client";
import {
  Button,
  Stack,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { register } from "../actions";

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Paper
        elevation={0}
        sx={{
          width: "100%",

          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          minWidth: {
            xs: "100%", // 0px and up
            sm: "400px", // 600px and up
            md: "680px", // 900px and up
          },
          maxWidth: {
            xs: "100%",
            sm: "600px",
            md: "800px",
          },
        }}
      >
        <Stack
          component="form"
          action={register}
          spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "350px",
              md: "400px",
            },
            mx: "auto",
          }}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            size={isMobile ? "small" : "medium"}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size={isMobile ? "small" : "medium"}
            sx={{
              mt: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            Register
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default Page;
