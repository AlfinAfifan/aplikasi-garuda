import DashboardLayout from "./components/Layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LembagaPage from "./pages/LembagaPage";
import AdminPage from "./pages/AdminPage";
import AnggotaPage from "./pages/AnggotaPage";
import RekapPage from "./pages/RekapPage";
import RamuPage from "./pages/RamuPage";
import RakitPage from "./pages/RakitPage";
import TerapPage from "./pages/TerapPage";
import PurwaPage from "./pages/PurwaPage";
import MadyaPage from "./pages/MadyaPage";
import UtamaPage from "./pages/UtamaPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/LoginPage";
import JenisTkkPage from "./pages/JenisTkkPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/lembaga" element={<LembagaPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/anggota" element={<AnggotaPage />} />
            <Route path="/ramu" element={<RamuPage />} />
            <Route path="/rakit" element={<RakitPage />} />
            <Route path="/terap" element={<TerapPage />} />
            <Route path="/purwa" element={<PurwaPage />} />
            <Route path="/madya" element={<MadyaPage />} />
            <Route path="/utama" element={<UtamaPage />} />
            <Route path="/jenis" element={<JenisTkkPage />} />
            <Route path="/rekap" element={<RekapPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
