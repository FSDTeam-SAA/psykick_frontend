"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-900 text-white">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <p className="text-sm text-gray-400 text-center">
              Continue to register as a customer or vendor. Please provide the information.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenName">Screen Name</Label>
              <Input
                id="screenName"
                placeholder="Choose your screen name"
                className="bg-gray-800"
                onChange={(e) => handleInputChange("screenName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Select onValueChange={(value) => handleInputChange("title", value)}>
                  <SelectTrigger className="bg-gray-800">
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
                  className="bg-gray-800"
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Select onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="bg-gray-800">
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
                className="bg-gray-800"
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-800"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="bg-gray-800"
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign Up
            </Button>
            <p className="text-sm text-center text-gray-400">
              Do you have account?{" "}
              <a href="#" className="text-purple-400 hover:underline">
                Log in
              </a>
            </p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="bg-gray-800 hover:bg-gray-700">
                <img src="/placeholder.svg?height=20&width=20" className="mr-2 h-5 w-5" alt="Google logo" />
                Continue With Google
              </Button>
              <Button variant="outline" className="bg-gray-800 hover:bg-gray-700">
                <img src="/placeholder.svg?height=20&width=20" className="mr-2 h-5 w-5" alt="Facebook logo" />
                Continue With Facebook
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

