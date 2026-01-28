import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { Button } from "@/shared/shadcn-ui/button";
import { Icon } from "@/shared/shadcn-ui/icon";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="w-full py-5 px-25 justify-between flex bg-neutral-800 border border-neutral-700">
      <div className="w-25">
        <Link to={ROUTE_PATHS.HOME}>
          <Icon name="Logo" className="w-25 text-white" />
        </Link>
      </div>
      <div className="text-white flex gap-10 items-center">
        <Link to={ROUTE_PATHS.MY_PROFILE}>Sell</Link>
        <Button variant="secondary" size="lg" className="rounded-full">
          Upgrade
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
