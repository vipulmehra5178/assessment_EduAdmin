'use client';

import React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Pagination,
  Skeleton,
  Box,
  Button
} from "@mui/material";
import { useRouter } from "next/navigation";
import useProductStore from "@/store/productStore";
import useAuthStore from "@/store/authStore";
import LogoutIcon from "@mui/icons-material/Logout";

function ProductsPage() {
  const products = useProductStore((state) => state.products);
  const categories = useProductStore((state) => state.categories);
  const total = useProductStore((state) => state.total);
  const page = useProductStore((state) => state.page);
  const limit = useProductStore((state) => state.limit);
  const loading = useProductStore((state) => state.loading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCategories = useProductStore((state) => state.fetchCategories);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts(0);
    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(0, searchInput, category);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput, category]);

  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  const handlePageChange = useCallback(
    (e, value) => {
      fetchProducts(value - 1, searchInput, category);
    },
    [fetchProducts, searchInput, category]
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "white"
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Product Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: "white",
            color: "#1e3c72",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#f4f4f4" }
          }}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            placeholder="Search products..."
            fullWidth
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#f8fafc"
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FormControl fullWidth>
  <Select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    displayEmpty
    renderValue={(selected) => {
      if (!selected) {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/filter.png"
              alt="filter"
              width={20}
              height={20}
              style={{ opacity: 0.8 }}
            />
          </Box>
        );
      }
      return selected;
    }}
    sx={{
      backgroundColor: "#f8fafc",
      borderRadius: 3,
      display: "flex",
      alignItems: "center"
    }}
  >
    <MenuItem value="">
      <em>All</em>
    </MenuItem>

    {categories.map((cat, index) => {
      const value =
        typeof cat === "string"
          ? cat
          : cat.slug || cat.name || JSON.stringify(cat);

      return (
        <MenuItem key={`${value}-${index}`} value={value}>
          {value}
        </MenuItem>
      );
    })}
  </Select>
</FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={12}>
        {loading ? (
          Array.from(new Array(12)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton
                variant="rectangular"
                height={320}
                sx={{ borderRadius: 7 }}
              />
            </Grid>
          ))
        ) : products.length === 0 ? (
          <Typography sx={{ m: 3 }}>No products found</Typography>
        ) : (
          products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <Card
                sx={{
                  height: 320,
                  width: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.35s ease",
                  cursor: "pointer",
                  background: "white",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                  }
                }}
                onClick={() =>
                  router.push(`/dashboard/products/${product.id}`)
                }
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    background:
                      "linear-gradient(135deg, #2385e7, #eef2f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      maxWidth: "75%",
                      maxHeight: "75%",
                      objectFit: "contain"
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: 48
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: "1.1rem",
                        color: "primary.main"
                      }}
                    >
                      ₹ {product.price}
                    </Typography>

                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        backgroundColor: "#fff3cd",
                        fontSize: "0.8rem",
                        fontWeight: 600
                      }}
                    >
                      ⭐ {product.rating}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>

    </Container>
  );
}

export default React.memo(ProductsPage);