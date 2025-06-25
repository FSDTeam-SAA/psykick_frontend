import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Hideon from "@/provider/Hideon";
import Image from "next/image";
import logo from "../../../../public/assets/img/logo.svg";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Challenges", href: "/challenges" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
  ],
};

// Define routes where the footer should be hidden
const HIDE_ROUTES = [
  "/signUp",
  "/login",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

export function SiteFooter() {
  return (
    <Hideon routes={HIDE_ROUTES}>
      <footer className="relative min-h-[300px] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dw5wizivl/image/upload/v1739719209/image_7_uahyxu.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Frosted Glass Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="backdrop-blur-sm bg-white/10 opacity-60 border rounded-3xl p-8">
            {/* Logo */}
            <div className="mb-8 w-full ">
              <Link
                href="/"
                className="text-3xl font-bold flex justify-center "
              >
                <Image alt="logo" src={logo} />
                {/* <span className="text-[#4CAF50]">Psykick</span>
                <span className="text-[#FFD700]">.club</span> */}
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center lg:justify-center lg:items-center sm:justify-start gap-x-6 gap-y-4 mb-8">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-white transition-colors text-base sm:text-lg"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t-[1px] border-white pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-white text-sm">
                © 2025 Psykick.com, All rights reserved.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white w-9 h-9 sm:w-[36px] sm:h-[36px] rounded-full flex items-center justify-center bg-[linear-gradient(90deg,_#8F37FF_0%,_#2D17FF_100%)] hover:scale-110 transition-transform"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex space-x-4 text-sm text-white">
                <Link
                  href="/PrivacyPolicy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Hideon>
  );
}
