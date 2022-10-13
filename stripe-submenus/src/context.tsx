import { useState, useContext, createContext, ReactNode, FC } from "react";
import sublinks from "./data";

interface IPage {
  page: string;
  links: { icon: JSX.Element; label: string; url: string }[];
}

interface ICoordinates {
  center: number;
  bottom: number;
}

interface IContext {
  isSidebarOpen: boolean;
  isSubmenuOpen: boolean;
  closeSubmenu: () => void;
  openSubmenu: (text: string, coordinates: ICoordinates) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  page: IPage;
  location: ICoordinates;
}

const defaultValue: IContext = {
  closeSidebar(): void {},
  closeSubmenu(): void {},
  openSidebar(): void {},
  openSubmenu(text: any, coordinates: ICoordinates): void {},
  isSidebarOpen: false,
  isSubmenuOpen: false,
  page: { page: "", links: [] },
  location: {
    center: 0,
    bottom: 0,
  },
};

const AppContext = createContext<IContext>(defaultValue);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [page, setPage] = useState<IPage>({ page: "", links: [] });
  const [location, setLocation] = useState<ICoordinates>({
    center: 0,
    bottom: 0,
  });
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text: string, coordinates: ICoordinates) => {
    setPage(sublinks.find((link) => link.page === text)!);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
