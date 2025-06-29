import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { logOutApi } from "../../api/ApiHandler";
import { checkAuthApi } from '../../api/ApiHandler';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type User = {
  _id: string;
  firstName: string;
  email: string;
  image?: string;
};

const UseAvatar = () => {
  const [user, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
  const response = await checkAuthApi();
  if (response && response.data && response.data.success === true && response.data.user && response.data.user.role === "admin") {
    setShow(true);
  }
}
checkAuth();
})

useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      try {
        const parsedUser: User = JSON.parse(data);
        setUserInfo(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Hello logout")
      await logOutApi();
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-success'));
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Avatar
          src={user?.image}
          firstName={user?.firstName}
          size="md"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-gray-200">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.firstName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          {show ? (<a href="/admin-dashboard">Admin Panel</a>) :
          (<a href="/builder">Resume Builder</a>)}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UseAvatar;
