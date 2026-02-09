import { Button } from "@/shared/shadcn-ui/button";

export const AuthPage = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:34/auth/google";
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login with google</Button>
    </div>
  );
};
