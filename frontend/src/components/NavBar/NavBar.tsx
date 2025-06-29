import React, { useEffect, useState } from "react";
import { Menu, FileText, Palette, Info, LogIn, UserPlus } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { authCheckApi } from "../../api/ApiHandler";
import UseAvatar from "../Avatars/UseAvatar";

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
}
type User = {
  _id: string;
  firstName: string;
  email: string;
  image?: string;
};

const Navbar = () => {

  const [user, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const data = localStorage.getItem('user');
      if (data) {
        try {
          const parsedUser: User = JSON.parse(data);
          setUserInfo(parsedUser);
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
    };

    loadUser();

    window.addEventListener('auth-success', loadUser);

    return () => {
      window.removeEventListener('auth-success', loadUser);
    };
  }, []);




  const navLinks: NavLink[] = [
    { to: "/templates", label: "Templates", icon: <Palette className="w-4 h-4" /> },
    { to: "/builder", label: "Build Resume", icon: <FileText className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <FileText className="w-8 h-8 text-blue-600" />
              <span>ResumeBuilder</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={({ isActive }) => ({
                    color: isActive ? "purple" : "blue",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  className="flex items-center space-x-2 text-black-700 hover:text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-pink-80 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-5 min-w-[250px] max-w-[250px] justify-end">
            {user ? (
              <UseAvatar />
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-white  px-4 py-2 rounded-lg text-sm font-medium  bg-gradient-to-r from-purple-600 to-blue-600
                  hover:from-blue-700 hover:to-purple-700  hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Button
                  asChild
                  className="flex items-center space-x-2 text-white  px-4 py-2 rounded-lg text-sm font-medium  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:from-purple-700 hover:to-blue-700  hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link to="/register" className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 mb-8">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ResumeBuilder
                    </span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4 mb-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-50 group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-4 mt-auto">
                    <Button variant="outline" asChild className="w-full justify-start">
                      <Link to="/login" className="flex items-center space-x-2">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button
                      
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    >
                      <Link to="/register" className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
