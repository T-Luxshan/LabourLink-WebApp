import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Data from "./Data.json";

const Categories = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          style={{
            marginTop: "70px",
            fontFamily: "Montserrat",
            color: "#00204A",
          }}
        >
          Labor Categories
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {Data.map((result, index) => (
            <Grid item xs={12} md={3} sm={3} key={index}>
              <Grow in={true} timeout={index * 300}>
                <Card
                  sx={{ maxWidth: 345, color: "#F97300" }}
                  style={{
                    padding: "10px",
                    marginBottom: "30px",
                    backgroundColor: "#F8F5E4",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={result.img}
                      alt={result.title}
                      style={{ borderRadius: "5px" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        {result.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "flex-end" }}>
                  <Link to={`/hire/${result.title}`}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        fontFamily: "Montserrat",
                        backgroundColor: "#00204A",
                      }}
                      // onClick={}
                    >
                      Hire
                    </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Categories;
