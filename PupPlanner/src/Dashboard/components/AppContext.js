import React, { useState } from "react";

const AppContext = React.createContext({
  selectedTab: "Network",
  setSelectedTab: () => {},
});

export const AppProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("Network");

  return (
    <AppContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
