import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { CircularProgress } from "@material-ui/core";
import { getAllLabourLocations } from "../Service/LocationService";

const MapWithLabourPositions = () => {
  const [labourPosition, setLabourPosition] = useState([]);
  const [zoom, setZoom] = useState(18);
  const [position, setPosition] = useState({ lat: 6.7953, lng: 79.9011 });
  const [open, setOpen] = useState(false);

    // Get the user's location when the component mounts
    // useEffect(() => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         setPosition({
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         });
    //       },
    //       (error) => {
    //         console.error("Error getting geolocation:", error);
    //       }
    //     );
    //   } else {
    //     console.error("Geolocation is not supported by this browser.");
    //   }
    // }, []);
  

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

  return (
    <div>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "100vh", width: "100%" }}>
          {labourPosition.length === 0 ? (
            <CircularProgress /> // Show loading indicator while fetching data
          ) : (
            <Map
              zoom={zoom}
              center={position}
              mapId={process.env.REACT_APP_MAP_ID}
              onZoomChanged={(newZoom) => setZoom(newZoom)}
            >
              <AdvancedMarker position={position} >
                <Pin />
              </AdvancedMarker>

              {labourPosition.map((location) => (
                <AdvancedMarker
                  position={{ lat: location.latitude, lng: location.longitude }}
                  key={location.id} // Assuming 'id' is unique
                  onClick={() => setOpen(true)}
                >
                  <span style={{ fontSize: "82px" }}>👨‍🔧</span>
                </AdvancedMarker>
              ))}

              {open && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpen(false)}
                >
                  <p>Your Current Location</p>
                </InfoWindow>
              )}
            </Map>
          )}
        </div>
      </APIProvider>
    </div>
  );
};

export default MapWithLabourPositions;
