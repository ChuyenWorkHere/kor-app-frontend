import React, { createContext, useState } from "react";

const BreadcrumbContext = createContext();

export const useBreadcrumbContext = () => {
    const context = React.useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumbContext must be used within a BreadcrumbProvider");
    }
    return context;
};

export const BreadcrumbProvider = ({ children }) => {
  const [title, setTitle] = useState("1. Thì Hiện Tại Đơn (Present Simple)");

  return (
    <BreadcrumbContext.Provider value={{ title, setTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
