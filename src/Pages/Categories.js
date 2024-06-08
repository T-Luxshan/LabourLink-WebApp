import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Card, CardContent, CardMedia, Typography, Grow, Button, CardActionArea, CardActions } from "@mui/material";
import Data from "./Data.json";

const Categories = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 4, mb: 4, fontFamily: "Montserrat", color: "#1a237e", fontWeight: "bold" }}
      >
        Labor Categories
      </Typography>
      <Grid container spacing={4}>
        {Data.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Grow in={true} timeout={index * 300}>
              <Card
                sx={{
                  maxWidth: 345,
                  p: 2,
                  mb: 7,
                  bgcolor: "#e9e9e9",
                  color: "#1a237e",
                  borderRadius: 4,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardActionArea component={Link} to={`/hire/${result.title}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={result.img}
                    alt={result.title}
                    sx={{ borderRadius: 4 }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                      sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                    >
                      {result.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Link to={`/hire/${result.title}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontFamily: "Montserrat",
                        backgroundColor: "#1a237e",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#3949ab",
                        },
                      }}
                    >
                      Hire
                    </Button>
                  </Link>
                </CardActions> */}
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;

