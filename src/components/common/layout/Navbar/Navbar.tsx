"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../../public/assets/img/logo.svg";

import { Menu, X, LogOut, User, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import Hideon from "@/provider/Hideon";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["userinfo", user?._id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-nextTierInfo/${user?._id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch tier info");
      const result = await res.json();
      return result.data;
    },
    enabled: !!user?._id,
  });

  const HIDE_ROUTES = [
    "/signUp",
    "/login",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/challenges", label: "Challenges" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const protectedMenuItems = isLoggedIn ? [] : [];

  const allMenuItems = [...menuItems, ...protectedMenuItems];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // console.log(data?.tierDetails?.image);
  return (
    <Hideon routes={HIDE_ROUTES}>
      <nav className="bg-[#300070]/5 backdrop-blur-lg py-4 px-6 fixed w-screen top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-[#4ADE80] text-2xl font-bold">
              <Image
                src={logo}
                width={194}
                height={38}
                alt="Psykick.club"
                priority
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
              {allMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    pathname === item.href
                      ? "text-[#78E76E] underline"
                      : "text-white hover:text-[#78E76E]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn && user ? (
                <>
                  {/* Notifications */}
                  <Link href="/notifications">
                    <div className="relative">
                      <Bell className="h-6 w-6 text-white hover:text-[#78E76E] transition-colors" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        !
                      </span>
                    </div>
                  </Link>

                  {/* Profile Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <Avatar className="h-8 w-8 border-2 border-[#78E76E]">
                          {data?.tierDetails?.image ? (
                            <AvatarImage
                              src={data?.tierDetails?.image}
                              alt={user.screenName || "User"}
                            />
                          ) : (
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="ml-2 text-white text-sm">
                          <div>Hello, {user.screenName}</div>
                          <div className="text-gray-300 text-xs">
                            {user.tierRank}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-[#300070] border-purple-700 text-white"
                    >
                      <DropdownMenuItem
                        className="hover:bg-purple-800 cursor-pointer"
                        onClick={() => handleNavigate("/profile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-purple-800 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="!px-[29px] !py-[22px] text-[16px] text-white hover:bg-[#6D28D9] btn-outline"
                    >
                      Log in
                    </Button>
                  </Link>
                  {/* <Link href="/signUp">
                    <Button
                      variant="outline"
                      className="border-white text-white text-[16px] font-medium iconGradient"
                    >
                      Sign Up
                    </Button>
                  </Link> */}
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-4 space-y-4">
              {isLoggedIn && user && (
                <div className="flex items-center justify-center">
                  <Avatar className="h-12 w-12 border-2 border-[#78E76E]">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.screenName} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="ml-2 text-white text-center">
                    <div>{user.screenName}</div>
                    <div className="text-gray-300 text-xs">{user.tierRank}</div>
                  </div>
                </div>
              )}

              {allMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-center hover:text-[#4ADE80] transition-colors block"
                >
                  {item.label}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href="/notifications"
                  className="flex items-center justify-center gap-2 text-white hover:text-[#4ADE80]"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    !
                  </span>
                </Link>
              )}

              <div className="flex flex-col space-y-2 pt-4">
                {isLoggedIn ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="secondary" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signUp">
                      <Button
                        variant="outline"
                        className="border-white text-white w-full"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </Hideon>
  );
}
