import { useState } from "react";
import Header from "../header";
import Modal from "./components/Modal";
import LoginForm from "../login";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../store/slices/userSlice";
import SignUp from "../signup";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  const dispath = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [typeForm, setTypeForm] = useState(null);

  const openForm = (type) => {
    setIsModal(true);
    setTypeForm(type);
  };

  const handleLogin = ({ email, password }) => {
    dispath(signIn({ email, password }));
    setIsModal(false);
  };

  const handleSignUp = ({ email, password, username, avatar, rePassword }) => {
    if (rePassword === password) {
      dispath(signUp({ email, password, username, avatar }));
      setIsModal(false);
    }
    console.log(password, rePassword);
  };

  return (
    <>
      {isModal ? (
        <Modal toggle={setIsModal}>
          {typeForm === 0 ? (
            <LoginForm handleSubmit={handleLogin} />
          ) : (
            <SignUp handleSubmit={handleSignUp} />
          )}
        </Modal>
      ) : null}
      <Header toggle={openForm} />
      <div className="flex min-h-[100vh] bg-gradient-to-tr from-[#3C096C] to-[#5A189A]">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default Layout;
