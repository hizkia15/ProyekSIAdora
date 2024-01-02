import { Spin } from "antd";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <DataContext.Provider value={{ setLoading }}>
      <Spin spinning={loading} size="large">
        {children}
      </Spin>
    </DataContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(DataContext);
};
