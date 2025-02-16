import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
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
}

export function SiteFooter() {
  return (
    <footer className="relative min-h-[300px] w-full rounded-xl">
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
        <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="text-3xl font-bold">
              <span className="text-[#4CAF50]">Psykick</span>
              <span className="text-[#FFD700]">.club</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-8 mb-8">
            {navigation.main.map((item) => (
              <Link key={item.name} href={item.href} className="text-white/90 hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/70 text-sm">© 2025 Psykick.com, All rights reserved.</p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-white/70 hover:text-white transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-4 text-sm text-white/70">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

