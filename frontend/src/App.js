import "@/App.css";
// import Pa1 from "@/pages/Pa1";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "@/pages/start";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}
