import React from "react";

const AppContext = React.createContext({
  selectedTab: "Network",
  setSelectedTab: () => {},
});

export default AppContext;
