'use client';

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Box,
  Divider,
  Skeleton
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import api from "@/services/api";

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const discountedPrice = useMemo(() => {
    if (!product) return null;
    return (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  }, [product]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Skeleton variant="text" height={50} width={300} />
        <Skeleton variant="rectangular" height={400} sx={{ mt: 2 }} />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">
          Failed to load product details.
        </Typography>
      </Container>
    );
  }

  return (
  <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>

    <Button
      onClick={() => router.back()}
      sx={{
        mb: 4,
        fontWeight: 600,
        textTransform: "none",
        "&:hover": { backgroundColor: "transparent" }
      }}
    >
      ← Back to Products
    </Button>

    <Paper
      elevation={8}
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        background: "linear-gradient(145deg, #ffffff, #f4f7fb)"
      }}
    >
      <Grid container>

        <Grid item xs={12} md={6}>

          <Box
            sx={{
              position: "relative",
              height: "100%",
              background: "linear-gradient(135deg, #eef2f7, #ffffff)"
            }}
          >
            <Chip
              label={`${product.discountPercentage}% OFF`}
              color="error"
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                fontWeight: 700,
                zIndex: 2
              }}
            />

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              loop
              style={{ height: "100%" }}
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 500
                    }}
                  >
                    <img
                      src={img}
                      alt={product.title}
                      style={{
                        maxWidth: "85%",
                        maxHeight: "85%",
                        objectFit: "contain",
                        transition: "transform 0.4s ease"
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: { xs: 3, md: 5 } }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              {product.title}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Chip
                label={product.category}
                sx={{
                  mr: 1,
                  backgroundColor: "#e3f2fd",
                  fontWeight: 600
                }}
              />
              <Chip
                label={`⭐ ${product.rating}`}
                sx={{
                  backgroundColor: "#fff8e1",
                  fontWeight: 600
                }}
              />
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f1f5f9, #ffffff)",
                mb: 3
              }}
            >
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary"
                }}
              >
                ₹ {product.price}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="success.main"
              >
                ₹ {discountedPrice}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                You save ₹{" "}
                {(product.price - discountedPrice).toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              sx={{
                lineHeight: 1.8,
                color: "text.secondary",
                mb: 4
              }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Typography>
                <strong>Brand:</strong> {product.brand}
              </Typography>

              <Typography>
                <strong>Stock:</strong>{" "}
                <Chip
                  label={
                    product.stock > 0
                      ? `${product.stock} Available`
                      : "Out of Stock"
                  }
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>

              <Typography>
                <strong>SKU:</strong> {product.sku || "N/A"}
              </Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>
    </Paper>
  </Container>
);
}