"use client"
import EmployeeLoginForm from "./components/Form/EmployeeLoginForm";
import Login from "./components/Auth/Login";

export default function Home() {
  return (
     <Login>
          <EmployeeLoginForm/>
     </Login>
  );
}
