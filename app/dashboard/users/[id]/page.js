"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Avatar,
  Skeleton,
  Chip,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";
import api from "@/services/api";

function mask(value, visible = 4) {
  if (!value) return "N/A";
  return "*".repeat(value.length - visible) + value.slice(-visible);
}

export default function SingleUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 6 }}>
        <Skeleton variant="rectangular" height={500} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "white",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={user.image}
              sx={{ width: 100, height: 100, border: "3px solid white" }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography>{user.email}</Typography>
              <Chip
                label={user.role}
                color={user.role === "Admin" ? "error" : "default"}
                sx={{ mt: 1, backgroundColor: "white" }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ backgroundColor: "white", color: "#1e3c72" }}
          >
            Back
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ borderRadius: 4 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<BusinessIcon />} label="Company" />
          <Tab icon={<AccountBalanceIcon />} label="Finance" />
          <Tab icon={<SecurityIcon />} label="Security" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {tab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography>
                      <b>Username:</b> {user.username}
                    </Typography>
                    <Typography>
                      <b>Age:</b> {user.age}
                    </Typography>
                    <Typography>
                      <b>Birth Date:</b> {user.birthDate}
                    </Typography>
                    <Typography>
                      <b>Gender:</b> {user.gender}
                    </Typography>
                    <Typography>
                      <b>Blood Group:</b> {user.bloodGroup}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography>
                      <b>Height:</b> {user.height} cm
                    </Typography>
                    <Typography>
                      <b>Weight:</b> {user.weight} kg
                    </Typography>
                    <Typography>
                      <b>Eye Color:</b> {user.eyeColor}
                    </Typography>
                    <Typography>
                      <b>Hair:</b> {user.hair?.color} ({user.hair?.type})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {tab === 1 && (
            <Card>
              <CardContent>
                <Typography>
                  <b>Company:</b> {user.company?.name}
                </Typography>
                <Typography>
                  <b>Department:</b> {user.company?.department}
                </Typography>
                <Typography>
                  <b>Title:</b> {user.company?.title}
                </Typography>
                <Typography>
                  <b>Address:</b> {user.company?.address?.address},{" "}
                  {user.company?.address?.city}
                </Typography>
              </CardContent>
            </Card>
          )}

          {tab === 2 && (
            <Card>
              <CardContent>
                <Typography>
                  <b>Card Type:</b> {user.bank?.cardType}
                </Typography>
                <Typography>
                  <b>Card Number:</b> {mask(user.bank?.cardNumber)}
                </Typography>
                <Typography>
                  <b>IBAN:</b> {mask(user.bank?.iban)}
                </Typography>
                <Typography>
                  <b>Currency:</b> {user.bank?.currency}
                </Typography>
                <Typography>
                  <b>Crypto:</b> {user.crypto?.coin}
                </Typography>
                <Typography>
                  <b>Wallet:</b> {mask(user.crypto?.wallet)}
                </Typography>
              </CardContent>
            </Card>
          )}

          {tab === 3 && (
            <Card>
              <CardContent>
                <Typography>
                  <b>IP:</b> {user.ip}
                </Typography>
                <Typography>
                  <b>MAC:</b> {user.macAddress}
                </Typography>
                <Typography>
                  <b>SSN:</b> {mask(user.ssn)}
                </Typography>
                <Typography>
                  <b>EIN:</b> {mask(user.ein)}
                </Typography>
                <Typography>
                  <b>User Agent:</b> {user.userAgent}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
