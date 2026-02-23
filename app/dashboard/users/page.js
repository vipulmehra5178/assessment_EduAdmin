'use client';

import React from "react"; 
import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Box,
  Skeleton,
  Avatar,
  Chip,
  InputAdornment,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import useAuthStore from "@/store/authStore";

function UsersPage() {
  const users = useUserStore((state) => state.users);
  const total = useUserStore((state) => state.total);
  const page = useUserStore((state) => state.page);
  const limit = useUserStore((state) => state.limit);
  const loading = useUserStore((state) => state.loading);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const [searchInput, setSearchInput] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    fetchUsers(0);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(0, searchInput);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const handlePageChange = useCallback(
    (event, newPage) => {
      fetchUsers(newPage, searchInput);
    },
    [fetchUsers, searchInput]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>

      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "white"
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            User Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "white",
              color: "#1e3c72",
              fontWeight: "bold"
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <TextField
        placeholder="Search users..."
        fullWidth
        sx={{ mb: 3 }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Company</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5}>
                    <Skeleton height={40} />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f0f4ff"
                    }
                  }}
                  onClick={() => router.push(`/dashboard/users/${user.id}`)}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={user.image}>
                        {user.firstName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.gender}
                      color={
                        user.gender === "male"
                          ? "primary"
                          : "secondary"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{user.phone}</TableCell>

                  <TableCell>{user.company?.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Box sx={{ borderTop: "1px solid #eee" }}>
          <TablePagination
            component="div"
            count={total}
            page={page}
            rowsPerPage={limit}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[10]}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(UsersPage);