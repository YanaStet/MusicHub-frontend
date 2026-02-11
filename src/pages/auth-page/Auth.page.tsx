import { useState } from "react";
import { LoginForm } from "./login-form/LoginForm";
import { RegisterForm } from "./register-form/RegisterForm";

export const AuthPage = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  return (
    <div className="flex items-center justify-center h-dvh">
      {displayRegister ? (
        <RegisterForm
          setDisplayRegister={() => {
            setDisplayRegister(false);
          }}
        />
      ) : (
        <LoginForm
          setDisplayRegister={() => {
            setDisplayRegister(true);
          }}
        />
      )}
    </div>
  );
};
