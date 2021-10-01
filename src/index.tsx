import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";

import App from "./App";
import {AppStoreProvider} from "./providers/app-store-provider";

ReactDOM.render(
    <AppStoreProvider>
        <App />
    </AppStoreProvider>,
    document.getElementById("root")
);
