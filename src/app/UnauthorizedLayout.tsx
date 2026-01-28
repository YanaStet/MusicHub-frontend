import { Outlet } from "react-router-dom";

export const UnauthorizedLayout = () => {
  return (
    <>
      <div className="bg-neutral-900 min-h-[calc(100dvh-82px)] text-white">
        <Outlet />
      </div>
    </>
  );
};
