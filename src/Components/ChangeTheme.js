import React, { useContext } from 'react';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../App'; // Update the path to ThemeContext if needed
import { Typography } from '@mui/material';

const ChangeTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Typography variant="h5" sx={titleStyles.h5}>
        Change Theme
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label>{theme === "dark?"}</label> {/* Not sure what you intended here */}
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
      </div>
    </>
  );
};

const titleStyles = {
  h5: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default ChangeTheme;
