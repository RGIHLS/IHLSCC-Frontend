/**
 * This file initializes the add-in and renders the App component after Office initializes.
 * It imports the necessary components and libraries, including App, AppContainer, initializeIcons, ThemeProvider, React, and ReactDOM.
 * It also defines the title of the add-in and sets the isOfficeInitialized flag to false initially.
 * The render function is called with the App component and the title and isOfficeInitialized props passed in.
 * The Office.onReady function sets the isOfficeInitialized flag to true and calls the render function with the App component.
 * If the module is hot, the App component is re-rendered when changes are made.
 */
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";

/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = true;

const title = "IHLS CC Add-in";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
