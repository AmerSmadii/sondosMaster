import logo from "./logo.svg";
import "./App.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { ProfilePage } from "./pages/ProfilePage";

import { FeedPage } from "./pages/FeedPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import Paper from "../src/Paper.png";
import { HomePage } from "./pages/HomePage";
import { FixedFooter } from "./components/FixedFooter";
import { ModalProvider } from "./hooks/useContext/ModalContext";
import { Test } from "./pages/Test";
import { MainCardFound } from "./components/MainCardFound";
import { UseUser, UserProvider } from "./hooks/useContext/UserContext";

import "./hooks/useContext/Config";
import { NotFound } from "./pages/NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

function App() {
  // Background style
  const BgTexture = {
    backgroundImage: `url(${Paper})`,
    backgroundSize: "cover",
  };

  const { user } = UseUser();

  return (
    <div style={BgTexture}>
      <UserProvider>
        <BrowserRouter>
          <ModalProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/profilepage"
                element={user ? <ProfilePage /> : <Navigate to="/signin" />}
              />
              <Route
                path="/feedpage"
                element={user ? <FeedPage /> : <Navigate to="/signin" />}
              />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/test" element={<Test />} />
              <Route
                path="/found/:id"
                element={user ? <MainCardFound /> : <Navigate to="/signin" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FixedFooter />
            <Footer />
          </ModalProvider>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
