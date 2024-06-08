import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { CircularProgress, Grid, Box, Typography } from "@material-ui/core";
import { getLocationsByJobRole } from "../Service/LocationService";
import { getLabourById } from "../Service/LabourService";
import ManIcon from "@mui/icons-material/Man";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormDialog from "../Components/FormDialog";
import findMe from "../Images/findMeCropped.png";

const MapView = () => {
  const [labourPosition, setLabourPosition] = useState([]);
  const [zoom, setZoom] = useState(18);
  const [position, setPosition] = useState({ lat: 6.7953, lng: 79.9011 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [labourSelected, setLabourSelected] = useState(null);
  const { jobRole } = useParams();
  const customerId = localStorage.getItem('userEmail');
  const navigate=useNavigate();

  const job=jobRole;

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
    if(customerId !== null){
    async function fetchLabourLocations() {
      try {
        const response = await getLocationsByJobRole(jobRole);
        console.log("Response from API:", response);
        setLabourPosition(response.data); // Update state
      } catch (error) {
        console.log("Error fetching labour locations", error);
      }
    }
    console.log("Fetching labour locations...");
    fetchLabourLocations(); // Fetch data on component mount
  }else{
    navigate("/login");
  }
  }, [jobRole]);

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
              {/* {labourPosition.length === 0 ? (
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ height: "100vh" }}
                >
                  <CircularProgress />
                </Grid>
              ) : ( */}
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
                <div
                  style={{
                    fontFamily: "Montserrat",
                    color: "#1a237e",
                    fontWeight: "bold",
                  }}
                >
                  <h2>Labour Details</h2>
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.email || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.name || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>Mobile Number:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {labourSelected?.mobileNumber || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1"style={{ fontWeight: "bold" }}>About:</Typography>
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
                      job
                    />
                  </Grid>
                </Grid>
              </div>
            ) : (
              <>
                <Box>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      color: "#1a237e",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <h1>
                      Find{" "}
                      {jobRole.charAt(0).toUpperCase() +
                        jobRole.slice(1).toLowerCase()}{" "}
                      on Map <LocationOnIcon />
                    </h1>
                  </div>
                  <img
                    src={findMe}
                    style={{
                      width: "250px",
                      height: "170px",
                      borderRadius: "5px",
                      display: "block", // Ensures image occupies full width on its line
                      margin: "auto", // Centers the image horizontally
                    }}
                  />
                  <div></div>
                  <h3 style={{ textAlign: "center", fontFamily: "Montserrat" }}>
                    Find me on map and continue hiring process
                  </h3>
                </Box>
              </>
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

export default MapView;
