import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/Index";

import { DashboardDataProvider } from "./providers/DashboardDataProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { LoadingProvider } from "./providers/LoadingProvider";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <DashboardDataProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </DashboardDataProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
