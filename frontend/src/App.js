import "@/App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Start />} />
        <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
