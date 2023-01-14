import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Room from "./routes/Room";
import Picpico from "./routes/Picpico";
import "rsuite/dist/rsuite.min.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/room/" element={<Room />}></Route>
        <Route path="/room/:id" element={<Picpico />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
