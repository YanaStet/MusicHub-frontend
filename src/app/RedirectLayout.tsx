import { authHooks } from "@/entities/auth/hooks";
import { Loader } from "@/shared/custom-ui/Loader";
import { useMe } from "@/shared/store/common";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const RedirectLayout = () => {
  const { data: me, isLoading } = authHooks.useMeQuery();

  const { setMe } = useMe();

  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      setMe(me.data);
      navigate(ROUTE_PATHS.HOME);
    } else {
      setMe(null);
      navigate(ROUTE_PATHS.AUTH);
    }
  }, [me]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-dvh min-w-dvh flex justify-center items-center bg-neutral-900">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
