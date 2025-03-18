"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    screenName: "",
    title: "",
    fullName: "",
    country: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  })

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value }

      // Check if passwords match whenever either password field changes
      if (field === "password" || field === "confirmPassword") {
        const doPasswordsMatch =
          newFormData.password === newFormData.confirmPassword ||
          // Allow empty confirm password while typing
          newFormData.confirmPassword === ""
        setPasswordsMatch(doPasswordsMatch)
      }

      return newFormData
    })
  }

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="min-h-screen   pt-[80px] p-4 lg:p-4 flex items-center justify-center">
      <Card className="w-full  max-w-xl bg-[#FFFFFF33]/20% backdrop-blur-lg text-white">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-center font-kdam smallShadow my-5">Sign Up</CardTitle>
            <p className="text-sm text-gray-400 text-center ">
              Continue to register as a customer or vendor. Please provide the information.
            </p>
            <h1 className="text-[22px] lg:text-[28px] font-normal smallShadow pt-5">Enter your Personal Information</h1>
          </CardHeader>
          <CardContent className="p-4 lg:px-6  space-y-4">
            {/* Previous form fields remain unchanged */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-transparent"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenName">Screen Name</Label>
              <Input
                id="screenName"
                placeholder="Choose your screen name"
                className="bg-transparent"
                onChange={(e) => handleInputChange("screenName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Select onValueChange={(value) => handleInputChange("title", value)}>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="miss">Miss.</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-3">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="bg-transparent"
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Select onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="bg-transparent">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="spain">Spain</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input
                id="dob"
                type="date"
                className="bg-transparent"
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>

            {/* Updated Password Fields */}
            <div className="space-y-2">
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisibility.password ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-transparent"
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {passwordVisibility.password ? (
                    <Eye className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">{passwordVisibility.password ? "Hide password" : "Show password"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="bg-transparent"
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? (
                    <Eye className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {passwordVisibility.confirmPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
              {!passwordsMatch && formData.confirmPassword !== "" && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox className="border border-white" id="terms" onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree with the term of service and privacy policy  <span className="text-red-500">*</span>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="btn mt-3"
              disabled={!passwordsMatch || !formData.password || !formData.confirmPassword || !formData.termsAccepted}
            >
              Sign Up
            </Button>
            <p className="text-sm text-center text-gray-400">
              Do you have account?{" "}
              <a href="#" className="text-purple-400 hover:underline">
                Log in
              </a>
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="btn-outline bg-transparent">
              <Image src="/assets/img/google.png" alt="Google" width={24} height={24} />
                Continue With Google
              </Button>
              <Button variant="outline" className="btn-outline bg-transparent">
              <Image src="/assets/img/facebook.png" alt="Google" width={24} height={24} />
                Continue With Facebook
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

