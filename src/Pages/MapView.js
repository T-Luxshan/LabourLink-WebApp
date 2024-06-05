import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  } from "@material-ui/core";
import { getAllLabourLocations } from "../Service/LocationService";
import NavigationBar from "../Components/NavigationBar";
import { getLabourById } from "../Service/LabourService";
import ManIcon from "@mui/icons-material/Man";
import FormDialog from "../Components/FormDialog";

const MapWithLabourPositions = () => {
  const [labourPosition, setLabourPosition] = useState([]);
  const [zoom, setZoom] = useState(18);
  const [position, setPosition] = useState({ lat: 6.7953, lng: 79.9011 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [labourSelected, setLabourSelected] = useState(null);
  const customerId = "johndoe@example.com";

  // Get the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    async function fetchLabourLocations() {
      try {
        const response = await getAllLabourLocations();
        console.log("Response from API:", response);
        setLabourPosition(response.data); // Update state
      } catch (error) {
        console.log("Error fetching labour locations", error);
      }
    }

    console.log("Fetching labour locations...");
    fetchLabourLocations(); // Fetch data on component mount
  }, []);

  const viewLabourDetails = (user) => {
    setSelectedUser(user);
    console.log(user);
    labourFullDetails(user.labourId);
  };

  const labourFullDetails = async (labourId) => {
    try {
      const labour = await getLabourById(labourId);
      setLabourSelected(labour.data);
      console.log("labour details: ", labour);
    } catch (error) {
      console.log("Error fetching labour details:", error);
    }
  };

  // const handleHireClick = () => {
  //   console.log("clicked");
  //   console.log(labourSelected?.email);
  //   setIsHireDialogOpen(true); // Set state to open the dialog
  // };

  return (
    <div>
      <NavigationBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid
            item
            md={8}
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "70px",
              boxSizing: "border-box",
              marginBottom: "10px",
            }}
          >
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              {/* Third grid content (Map) */}
              {labourPosition.length === 0 ? (
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ height: "100vh" }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
                <Map
                  zoom={zoom}
                  center={position}
                  mapId={process.env.REACT_APP_MAP_ID}
                  onZoomChanged={(newZoom) => setZoom(newZoom)}
                  style={{ height: "65vh" }}
                  fullscreenControl={false}
                >
                  <AdvancedMarker position={position}>
                    <Pin />
                  </AdvancedMarker>
                  {labourPosition.map((location) => (
                    <AdvancedMarker
                      position={{
                        lat: location.latitude,
                        lng: location.longitude,
                      }}
                      key={location.id}
                      onClick={() => {
                        viewLabourDetails(location);
                      }}
                    >
                      {/* <span style={{ fontSize: "42px" }}>👨‍🔧</span> */}
                      <ManIcon sx={{ fontSize: "40px" }} />
                    </AdvancedMarker>
                  ))}
                </Map>
              )}
            </APIProvider>
          </Grid>
          <Grid
            item
            md={4}
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "70px",
              boxSizing: "border-box",
              marginBottom: "10px",
            }}
          >
            {selectedUser ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  <strong>Labour Details</strong>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.email || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.name || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">Mobile Number:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.mobileNumber || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">About:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.about || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Button variant="outlined" onClick={handleHireClick}>
                      Hire
                    </Button> */}
                    {/* {isHireDialogOpen && (
                      <FormDialog
                      labourEmail={labourSelected?.email}
                      cutomerEmail={customerId}
                      onClose={() => setIsHireDialogOpen(false)}
                      />
                    )} */}
                    <FormDialog
                      labourEmail={labourSelected?.email}
                      cutomerEmail={customerId}
                      labourName={labourSelected?.name}
                      />
                  </Grid>
                </Grid>
                
              </div>
            ) : (
              <Typography>No labour selected</Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "10px",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ marginTop: "40px" }}>
              <strong>Reviews</strong>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MapWithLabourPositions;
