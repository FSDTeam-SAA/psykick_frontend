"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../../../../public/assets/img/logo.svg";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/challenges", label: "Challenges" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#300070]/5 backdrop-blur-lg py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-[#4ADE80] text-2xl font-bold">
            {/* Psykick.club */}
            <Image src={logo} width={194} height={38} alt="Psykick.club" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#78E76E] transition-colors font-inter text-base font-medium leading-[19.2px]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              className=" btn hover:bg-[#6D28D9] !px-[29px]  !py-[12px] text-[16px] text-white"
            >
              log in
            </Button>
<<<<<<< HEAD
            <Button variant="outline" className="text-white border-white">
              Register now
            </Button>
=======
            <button  className="text-white text-[16px] font-medium  btn-outline !px-[20px]  !py-[12px] border-white">
              Sign Up
            </button>
>>>>>>> 8ee47d6d5bc2776013b5722c8a314c63cebc31f0
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[#4ADE80] transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="secondary"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white w-full"
                >
                  log in
                </Button>
                <button
                  className="text-white btn-outline border-white w-full"
                >
<<<<<<< HEAD
                  Register now
                </Button>
=======
                  Sign Up
                </button>
>>>>>>> 8ee47d6d5bc2776013b5722c8a314c63cebc31f0
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
