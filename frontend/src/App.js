import "@/App.css";
import Main from "@/pages/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSpot = () => {
    navigate("/main");
  };

  return (
    <div className="app-container">
      {/* / 경로에서만 버튼을 보여줍니다 */}
      {location.pathname === "/" && (
        <button onClick={handleSpot}>go to main</button>
      )}
      <Routes>
        <Route path="/main" element={<Main />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router>
  );
}
