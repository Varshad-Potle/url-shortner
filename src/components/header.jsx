import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState }  from "@/context";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { loading, fn: fnLogOut } = useFetch(logout);
  
  const { user, fetchUser } = UrlState();

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo1.png" alt="Trimme logo" className="h-16" />
        </Link>

        <div className="flex gap-4">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain"/>
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LinkIcon className="mr-2 h-4 w-4"/>
                    <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={() => {
                      fnLogOut().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
