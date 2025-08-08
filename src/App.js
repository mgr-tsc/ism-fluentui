import React, { useState } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import SignInForm from "./components/SignInForm";
import MainLayout from "./components/MainLayout";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true to show MainLayout

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        {isAuthenticated ? (
          <MainLayout onSignOut={() => setIsAuthenticated(false)} />
        ) : (
          <SignInForm onSignIn={() => setIsAuthenticated(true)} />
        )}
      </div>
    </FluentProvider>
  );
}
export default App;
