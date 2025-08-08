import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Input,
  Button,
  Label,
  makeStyles,
  shorthands,
  tokens,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import {
  Person24Regular,
  LockClosed24Regular,
  Building24Regular,
} from "@fluentui/react-icons";

// --- Styles ---
// Using makeStyles for a CSS-in-JS approach, which is a common pattern with Fluent UI.
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground3})`,
    ...shorthands.padding("20px"),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "20px",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: tokens.colorNeutralBackgroundCanvas,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding("40px"),
    boxShadow: tokens.shadow64,
    transitionProperty: "all",
    transitionDuration: "0.5s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    ":hover": {
      boxShadow: tokens.shadow28,
      transform: "translateY(-4px)",
    },
  },
  header: {
    textAlign: "center",
    color: tokens.colorNeutralForeground1,
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  signInButton: {
    marginTop: "20px",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
  },
  footerLink: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: "none",
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      color: tokens.colorBrandForegroundLinkHover,
      textDecorationLine: "underline",
    },
  },
});

// --- Company Data ---
// Sample data for the dropdown. In a real app, this would come from an API.
const companyOptions = [
  { key: "acme", text: "Acme Corporation" },
  { key: "stark", text: "Stark Industries" },
  { key: "wayne", text: "Wayne Enterprises" },
  { key: "cyberdyne", text: "Cyberdyne Systems" },
  { key: "tyrell", text: "Tyrell Corporation" },
];

const SignInForm = ({ onSignIn }) => {
  const styles = useStyles();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Event Handlers ---
  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Signing in with:", {
      company: selectedCompany,
      email,
      password,
    });

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would handle the response, e.g., show an error or redirect
      if (onSignIn) {
        onSignIn();
      } else {
        alert("Sign-in attempt complete! Check the console for details.");
      }
    }, 1500);
  };
  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <form
          className={styles.formContainer}
          onSubmit={handleSignIn}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to access your dashboard</p>
          </div>

          {/* Company Dropdown */}
          <div className={styles.field}>
            <Label
              htmlFor="company-dropdown"
              required
            >
              Company
            </Label>
            <Dropdown
              id="company-dropdown"
              placeholder="Select a company"
              contentBefore={<Building24Regular />}
              onOptionSelect={(_, data) => setSelectedCompany(data.optionValue)}
              value={
                selectedCompany
                  ? companyOptions.find((c) => c.key === selectedCompany)?.text
                  : ""
              }
              style={{ width: "100%" }}
            >
              {companyOptions.map((option) => (
                <Option
                  key={option.key}
                  value={option.key}
                >
                  {option.text}
                </Option>
              ))}
            </Dropdown>
          </div>

          {/* Email Input */}
          <div className={styles.field}>
            <Label
              htmlFor="email-input"
              required
            >
              Email
            </Label>
            <Input
              id="email-input"
              type="email"
              placeholder="e.g., user@example.com"
              contentBefore={<Person24Regular />}
              value={email}
              onChange={(_, data) => setEmail(data.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className={styles.field}>
            <Label
              htmlFor="password-input"
              required
            >
              Password
            </Label>
            <Input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              contentBefore={<LockClosed24Regular />}
              value={password}
              onChange={(_, data) => setPassword(data.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <Button
            appearance="primary"
            type="submit"
            className={styles.signInButton}
            disabled={!selectedCompany || !email || !password || isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <div className={styles.footer}>
            <span>Don't have an account? </span>
            <a
              href="#"
              className={styles.footerLink}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </FluentProvider>
  );
};

export default SignInForm;
