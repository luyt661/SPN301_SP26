import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; //
import ListOfOrchid from "./components/ListOfOrchid"; // Lưu ý: Không có chữ 's'
import EditOrchid from "./components/EditOrchid"; //

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfOrchid />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  );
}

export default App;