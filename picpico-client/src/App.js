import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Lobby from "./routes/Lobby";
import Picpico from "./routes/Picpico";
import "rsuite/dist/rsuite.min.css";
//login완료하면 갈 곳이 lobby야
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/lobby/:nickname" element={<Lobby />}></Route>
        <Route path="/room/:id" element={<Picpico />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
