import "@/App.css";
import Main from "@/pages/Main";
import Notice from "@/pages/Notice";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function AppContent() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleSpot = () => {
  //   navigate("/main");
  // };

  return (
    <div className="app-container">
      {/* {location.pathname === "/" && (
        <button onClick={handleSpot}>go to main</button>
      )} */}
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      <FloatingButton />
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
