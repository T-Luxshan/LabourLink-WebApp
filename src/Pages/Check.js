"use client";
import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { getAllLabourLocations } from "../Service/LocationService";
import { Container, Typography, Box } from "@material-ui/core";

const MapView = () => {
  const [position, setPosition] = useState({ lat: 6.7951, lng: 79.9009 });
  const [zoom, setZoom] = useState(15);
  const [open, setOpen] = useState(false);
  const [labourPosition, setLabourPosition] = useState([]);

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

  useEffect(() => {
    console.log("Labour positions:", labourPosition);
  }, [labourPosition]); // Log labourPosition when it changes

  return (
    <div>

      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "50vh", width: "100%" }}>
          <Map
            zoom={zoom}
            center={position}
            mapId={process.env.REACT_APP_MAP_ID}
            onZoomChanged={(newZoom) => setZoom(newZoom)}
          >
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin />
            </AdvancedMarker>

            {/* <Markers points={labourPosition} /> */}
            <>
              {Array.isArray(labourPosition) ? (
                labourPosition.map((location) => (
                  <AdvancedMarker
                    position={{
                      lat: location.latitude,
                      lng: location.longitude,
                    }}
                    key={location.id} // Assuming 'id' is unique
                  >
                    <span>👷‍♂️</span>
                  </AdvancedMarker>
                ))
              ) : (
                <p>No labour positions found.</p>
              )}
            </>

            {open && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpen(false)}
              >
                <p>Your Current Location</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapView;
