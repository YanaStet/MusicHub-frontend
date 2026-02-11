import { Outlet } from "react-router-dom";

export const UnauthorizedLayout = () => {
  return (
    <>
      <div className="bg-neutral-900 min-h-dvh text-white">
        <Outlet />
      </div>
    </>
  );
};
