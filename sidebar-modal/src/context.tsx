import { useState, useContext, createContext, ReactNode, FC } from "react";

interface IContext {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  openSidebar?: () => void;
  closeSidebar?: () => void;
}

const defaultValue: IContext = {
  isSidebarOpen: false,
  isModalOpen: false,
};
const AppContext = createContext<IContext>(defaultValue);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        openSidebar: () => setIsSidebarOpen(true),
        closeSidebar: () => setIsSidebarOpen(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
