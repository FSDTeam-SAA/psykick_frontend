"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 ">
      <div className="w-full max-w-xl p-8 rounded-3xl backdrop-blur-sm bg-black/30  border border-[#FFFFFF33]/20%">
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-kdam text-[32px] text-white smallShadow">Log In</h1>
          <p className="text-gray-200 lg:text-md">
            Continue to register as a customer or vendor, Please provide the information.
          </p>
        </div>

        <div className="mb-6">
          <h2 className=" font-semibold text-white mb-4 text-[28px] smallShadow">Enter your Personal Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-200">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-200">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ?   <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

          <div className="flex items-center justify-center">
          <Button type="submit" className=" btn">
              Log In
            </Button>
          </div>
          </form>

          <div className="mt-6 space-y-2 text-center">
            <Link href="/forgot-password" className="block text-sm text-gray-200 hover:text-white">
              I forgot my password?
            </Link>
            <p className="text-sm text-gray-200">
              Don&apos;t you have account?{" "}
              <Link href="/signUp" className="text-purple-400 hover:text-purple-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

