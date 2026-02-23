'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  Typography,
  Container,
  Button,
  Paper,
  Grid,
  Box,
  Skeleton,
  Avatar,
  Card,
  CardContent
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import useAuthStore from "@/store/authStore";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (session?.user) {
      login(session.user, session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const handleLogout = useCallback(async () => {
    logout();
    await signOut({ redirect: false });
    router.push("/login");
  }, [logout, router]);

  if (status === "loading") {
    return (
      <Container sx={{ mt: 6 }}>
        <Skeleton variant="text" width={250} height={50} />
        <Skeleton variant="rectangular" height={180} sx={{ mt: 3 }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 50,
              height: 50
            }}
          >
            {session?.user?.firstName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Welcome, {session?.user?.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Admin Dashboard
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6
              }
            }}
            onClick={() => router.push("/dashboard/users")}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Manage Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View, search and manage all registered users.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6
              }
            }}
            onClick={() => router.push("/dashboard/products")}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InventoryIcon color="secondary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Manage Products
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse, filter and control product listings.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}