import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { Button } from "@/shared/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/icon";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTE_PATHS.AUTH);
  };

  return (
    <div className="w-full py-5 px-10 2xl:px-25 justify-between flex bg-neutral-800 border border-neutral-700">
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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-700 border-neutral-700 text-white">
            <Link to={ROUTE_PATHS.MY_PROFILE}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
