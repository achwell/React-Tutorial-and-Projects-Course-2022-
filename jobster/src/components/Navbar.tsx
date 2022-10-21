import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearStore, toggleSidebar } from "../features/user/userSlice";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { Logo } from "./index";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  console.log({ user });

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("Logging out..."))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
