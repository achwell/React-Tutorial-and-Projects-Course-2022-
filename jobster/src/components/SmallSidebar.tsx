import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { toggleSidebar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
const SmallSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
