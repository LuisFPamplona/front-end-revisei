import { useContext } from "react";
import DashboardDataContext from "../context/DashboardDataContext";

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error(
      "useDashboardData must be used within a DashboardDataProvider.",
    );
  }

  return context;
};
