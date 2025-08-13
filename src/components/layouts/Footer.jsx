import React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Text,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  footer: {
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "0 auto",
    ...shorthands.padding("0", "24px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("0", "16px"),
      height: "36px",
    },
  },

  footerText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 568px)": {
      fontSize: tokens.fontSizeBase100,
    },
  },
});

const Footer = ({ companyName = "Acme Corporation" }) => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Text className={styles.footerText}>
        © 2024 {companyName}. All rights reserved.
      </Text>
      <Text className={styles.footerText}>
        Version 1.0.0 | Status: Online
      </Text>
    </footer>
  );
};

export default Footer;
