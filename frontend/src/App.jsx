import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import CustomerLayout from "./components/Layout/CustomerLayout";
import EmployeeLayout from "./components/Layout/EmployeeLayout";
import { customerRoutes } from "./modules/customer/routes";
import { internalLoginRoute, internalRoutes } from "./modules/internal/routes";
import { Loading } from "./shared/ui";

function App() {
  const InternalLoginComponent = internalLoginRoute.component;

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <Suspense
        fallback={
          <div className="py-16">
            <Loading />
          </div>
        }
      >
        <Routes>
        {/* Customer Routes with Layout */}
        <Route element={<CustomerLayout />}>
          {customerRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>

        {/* Employee Routes */}
        <Route
          path={internalLoginRoute.path}
          element={<InternalLoginComponent />}
        />
        <Route path="/internal" element={<EmployeeLayout />}>
          <Route
            index
            element={<Navigate to="/internal/dashboard" replace />}
          />
          {internalRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route
            path="settings"
            element={
              <div className="p-8">
                <h2>Cài đặt hệ thống (Đang phát triển)</h2>
              </div>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-6xl font-black text-gray-300 mb-4">404</h1>
              <p className="text-xl text-gray-500 mb-8">Trang không tồn tại.</p>
              <a
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-none font-bold"
              >
                Về trang chủ
              </a>
            </div>
          }
        />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
