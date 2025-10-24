// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css"; // ensure Tailwind is loaded in your project

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
