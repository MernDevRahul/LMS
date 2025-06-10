import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./globals.css";
import BootstrapInstall from "./components/Bootstrap install/BootstrapJSinstaller";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";
import { MainAdminProvider } from "./context/AdminContext";
import { LeadContextProvider } from "./context/LeadContext";
import { RoleContextProvider } from "./context/RoleContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import PaymentContextProvider from "./context/PaymentContext";
import { CourseContextProvider } from "./context/CourseContext";
import { EmiContextProvider } from "./context/EmiContext";
import { StudentLoginContextProvider } from "./context/StudentLoginContext";
import { StudentContextProvider } from "./context/StudentContext";

export const metadata = {
  title: "TechStack Academy",
  description: "Techstack LMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <BootstrapInstall />
        <StudentLoginContextProvider>
          <StudentContextProvider>
            <PaymentContextProvider>
              <EmiContextProvider>
                <CourseContextProvider>
                  <PaymentContextProvider>
                    <EmployeeContextProvider>
                      <RoleContextProvider>
                        <LeadContextProvider>
                          <MainAdminProvider>
                            <UserContextProvider>
                              <div className="wrapper">{children}</div>
                            </UserContextProvider>
                          </MainAdminProvider>
                        </LeadContextProvider>
                      </RoleContextProvider>
                    </EmployeeContextProvider>
                  </PaymentContextProvider>
                </CourseContextProvider>
              </EmiContextProvider>
            </PaymentContextProvider>
          </StudentContextProvider>
        </StudentLoginContextProvider>
      </body>
    </html>
  );
}
