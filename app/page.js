'use client';

import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Stack
} from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #1976d2, #9c27b0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            EduAdmin Pro
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: 700, mx: "auto" }}
          >
            A modern admin dashboard built with Next.js, Zustand, and Material UI.
            Manage users and products efficiently with clean architecture,
            role-based access control, and optimized performance.
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/login")}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-3px)" }
              }}
            >
              Admin Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push("/dashboard")}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-3px)" }
              }}
            >
              Go to Dashboard
            </Button>
          </Stack>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box>
                <DashboardIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Clean Architecture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Structured state management with Zustand and scalable routing.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <LockIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Secure Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  NextAuth credentials flow with protected dashboard routes.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <SpeedIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Optimized Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Debounced search, pagination, and minimal re-renders.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 7 }}>
            <Typography variant="body2" color="text.secondary">
              Built for technical assessment using DummyJSON API.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}