import { authHooks } from "@/entities/auth/hooks";
import { Header } from "@/features/Header";
import { Loader } from "@/shared/custom-ui/Loader";
import { useMe } from "@/shared/store/common";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthorizedLayout = () => {
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
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <Header />
          <div className="bg-neutral-900 min-h-[calc(100dvh-82px)] text-white">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};
