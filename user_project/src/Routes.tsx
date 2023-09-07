import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Register from "./components/Register";
const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/sign_up" element={<Register />} />
    </Routes>
  );
};

export default routes;
