import React from "react";
import {
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "44px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    "@media (max-width: 768px)": {
      height: "44px",
    },
  },

  navigation: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    "@media (max-width: 768px)": {
      gap: "24px",
    },
  },

  navLink: {
    color: "#1d1d1f",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "400",
    lineHeight: "1.23",
    letterSpacing: "-0.022em",
    cursor: "pointer",
    position: "relative",
    transition: "color 0.3s ease",
    
    ":hover": {
      color: "#0066cc",
    },

    "::after": {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: "50%",
      width: "0",
      height: "1px",
      backgroundColor: "#0066cc",
      transform: "translateX(-50%)",
      transition: "width 0.3s ease",
    },

    ":hover::after": {
      width: "100%",
    },

    "@media (max-width: 768px)": {
      fontSize: "16px",
    },

    "@media (max-width: 480px)": {
      fontSize: "15px",
    },
  },

  signOutLink: {
    color: "#1d1d1f",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "400",
    lineHeight: "1.23",
    letterSpacing: "-0.022em",
    cursor: "pointer",
    position: "relative",
    transition: "color 0.3s ease",
    
    ":hover": {
      color: "#ff3b30",
    },

    "::after": {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: "50%",
      width: "0",
      height: "1px",
      backgroundColor: "#ff3b30",
      transform: "translateX(-50%)",
      transition: "width 0.3s ease",
    },

    ":hover::after": {
      width: "100%",
    },

    "@media (max-width: 768px)": {
      fontSize: "16px",
    },

    "@media (max-width: 480px)": {
      fontSize: "15px",
    },
  },
});

const Header = ({ onSignOut }) => {
  const styles = useStyles();

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  const handleNavClick = (section) => {
    // Handle navigation to different sections
    console.log(`Navigate to ${section}`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Text 
          className={styles.navLink}
          onClick={() => handleNavClick('features')}
        >
          Features
        </Text>
        <Text 
          className={styles.navLink}
          onClick={() => handleNavClick('customize')}
        >
          Customize
        </Text>
        <Text 
          className={styles.signOutLink}
          onClick={handleSignOut}
        >
          Sign Out
        </Text>
      </nav>
    </header>
  );
};

export default Header;
