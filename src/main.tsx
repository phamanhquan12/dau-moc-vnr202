import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/app.css";
import "./styles/exhibition.css";
import "./styles/history-map.css";
createRoot(document.getElementById("root")!).render(<App />);
