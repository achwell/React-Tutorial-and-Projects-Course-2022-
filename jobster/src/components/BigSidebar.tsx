import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppSelector } from "../app/hooks";

const BigSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={() => {}} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
