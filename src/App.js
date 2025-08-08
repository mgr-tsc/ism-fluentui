import React, { useState } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import SignInForm from "./components/SignInForm";
import "./App.css";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        // <SignInForm></SignInForm>
      </div>
    </FluentProvider>
  );
}
export default App;
