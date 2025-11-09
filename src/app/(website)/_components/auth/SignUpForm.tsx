"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface RegisterUserRequest {
  email: string;
  screenName: string;
  fullName: string;
  country: string;
  dob: string;
  password: string;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  userId?: string;
  // Add any other fields your API returns
}

export default function SignUpForm() {
  const router = useRouter();
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
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const registerUser = async (
    userData: RegisterUserRequest,
  ): Promise<RegisterUserResponse> => {
    // const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      // Check if passwords match whenever either password field changes
      if (field === "password" || field === "confirmPassword") {
        const doPasswordsMatch =
          newFormData.password === newFormData.confirmPassword ||
          // Allow empty confirm password while typing
          newFormData.confirmPassword === "";
        setPasswordsMatch(doPasswordsMatch);
      }

      return newFormData;
    });
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.email ||
      !formData.screenName ||
      !formData.fullName ||
      !formData.country ||
      !formData.dateOfBirth ||
      !formData.password
    ) {
      // toast({
      //   title: "Missing Information",
      //   description: "Please fill in all required fields",
      //   variant: "destructive",
      // })
      toast.error("Missing Information");
      return;
    }

    // Format the data for the API
    const userData: RegisterUserRequest = {
      email: formData.email,
      screenName: formData.screenName,
      fullName: formData.fullName,
      country: formData.country,
      dob: formData.dateOfBirth,
      password: formData.password,
    };

    // Call the mutation
    mutation.mutate(userData);
  };

  return (
    <div
      className="min-h-screen pt-[80px] p-4 lg:p-4 flex items-center justify-center mt-[61px]"
      style={{
        backgroundImage: 'url("/assets/img/backloging.png")', // 👈 image path ekhane
        backgroundSize: "cover", // pura div e image fill korbe
        backgroundRepeat: "no-repeat", // repeat korbe na
        backgroundPosition: "center", // image ke center e rakhbe
      }}
    >
      <Card className="w-full max-w-xl bg-[#FFFFFF33]/20% backdrop-blur-lg text-white">
        <form
          onSubmit={handleSubmit}
          className=""
          style={{
            backgroundImage: 'url("/assets/img/loginUpimg.png")', // 👈 image path ekhane
            backgroundSize: "cover", // pura div e image fill korbe
            backgroundRepeat: "no-repeat", // repeat korbe na
            backgroundPosition: "center", // image ke center e rakhbe
          }}
        >
          <CardHeader>
            <CardTitle className="text-center font-kdam smallShadow my-5">
              Sign Up
            </CardTitle>
            <p className="text-sm text-gray-400 text-center ">
              Sign up for your Psykick Club account to continue your journey.
              Please provide the information.
            </p>
            <h1 className="text-[22px] lg:text-[28px] font-normal smallShadow pt-5">
              Enter your Personal Information
            </h1>
          </CardHeader>
          <CardContent className="p-4 lg:px-6 space-y-4">
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
                onChange={(e) =>
                  handleInputChange("screenName", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Select
                  onValueChange={(value) => handleInputChange("title", value)}
                >
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
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Select
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="bg-transparent">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="afghanistan">Afghanistan</SelectItem>
                  <SelectItem value="albania">Albania</SelectItem>
                  <SelectItem value="algeria">Algeria</SelectItem>
                  <SelectItem value="andorra">Andorra</SelectItem>
                  <SelectItem value="angola">Angola</SelectItem>
                  <SelectItem value="antigua">Antigua and Barbuda</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="armenia">Armenia</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="austria">Austria</SelectItem>
                  <SelectItem value="azerbaijan">Azerbaijan</SelectItem>
                  <SelectItem value="bahamas">Bahamas</SelectItem>
                  <SelectItem value="bahrain">Bahrain</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="barbados">Barbados</SelectItem>
                  <SelectItem value="belarus">Belarus</SelectItem>
                  <SelectItem value="belgium">Belgium</SelectItem>
                  <SelectItem value="belize">Belize</SelectItem>
                  <SelectItem value="benin">Benin</SelectItem>
                  <SelectItem value="bhutan">Bhutan</SelectItem>
                  <SelectItem value="bolivia">Bolivia</SelectItem>
                  <SelectItem value="bosnia">Bosnia and Herzegovina</SelectItem>
                  <SelectItem value="botswana">Botswana</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="brunei">Brunei</SelectItem>
                  <SelectItem value="bulgaria">Bulgaria</SelectItem>
                  <SelectItem value="burkina">Burkina Faso</SelectItem>
                  <SelectItem value="burundi">Burundi</SelectItem>
                  <SelectItem value="cambodia">Cambodia</SelectItem>
                  <SelectItem value="cameroon">Cameroon</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="cape">Cape Verde</SelectItem>
                  <SelectItem value="central">
                    Central African Republic
                  </SelectItem>
                  <SelectItem value="chad">Chad</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="colombia">Colombia</SelectItem>
                  <SelectItem value="comoros">Comoros</SelectItem>
                  <SelectItem value="congo">Congo</SelectItem>
                  <SelectItem value="costa">Costa Rica</SelectItem>
                  <SelectItem value="croatia">Croatia</SelectItem>
                  <SelectItem value="cuba">Cuba</SelectItem>
                  <SelectItem value="cyprus">Cyprus</SelectItem>
                  <SelectItem value="czech">Czech Republic</SelectItem>
                  <SelectItem value="denmark">Denmark</SelectItem>
                  <SelectItem value="djibouti">Djibouti</SelectItem>
                  <SelectItem value="dominica">Dominica</SelectItem>
                  <SelectItem value="dominican">Dominican Republic</SelectItem>
                  <SelectItem value="east">East Timor</SelectItem>
                  <SelectItem value="ecuador">Ecuador</SelectItem>
                  <SelectItem value="egypt">Egypt</SelectItem>
                  <SelectItem value="el">El Salvador</SelectItem>
                  <SelectItem value="equatorial">Equatorial Guinea</SelectItem>
                  <SelectItem value="eritrea">Eritrea</SelectItem>
                  <SelectItem value="estonia">Estonia</SelectItem>
                  <SelectItem value="ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="fiji">Fiji</SelectItem>
                  <SelectItem value="finland">Finland</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="gabon">Gabon</SelectItem>
                  <SelectItem value="gambia">Gambia</SelectItem>
                  <SelectItem value="georgia">Georgia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="greece">Greece</SelectItem>
                  <SelectItem value="grenada">Grenada</SelectItem>
                  <SelectItem value="guatemala">Guatemala</SelectItem>
                  <SelectItem value="guinea">Guinea</SelectItem>
                  <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                  <SelectItem value="guyana">Guyana</SelectItem>
                  <SelectItem value="haiti">Haiti</SelectItem>
                  <SelectItem value="honduras">Honduras</SelectItem>
                  <SelectItem value="hungary">Hungary</SelectItem>
                  <SelectItem value="iceland">Iceland</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="indonesia">Indonesia</SelectItem>
                  <SelectItem value="iran">Iran</SelectItem>
                  <SelectItem value="iraq">Iraq</SelectItem>
                  <SelectItem value="ireland">Ireland</SelectItem>
                  <SelectItem value="israel">Israel</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="ivory">Ivory Coast</SelectItem>
                  <SelectItem value="jamaica">Jamaica</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="jordan">Jordan</SelectItem>
                  <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="kiribati">Kiribati</SelectItem>
                  <SelectItem value="korea-north">North Korea</SelectItem>
                  <SelectItem value="korea-south">South Korea</SelectItem>
                  <SelectItem value="kosovo">Kosovo</SelectItem>
                  <SelectItem value="kuwait">Kuwait</SelectItem>
                  <SelectItem value="kyrgyzstan">Kyrgyzstan</SelectItem>
                  <SelectItem value="laos">Laos</SelectItem>
                  <SelectItem value="latvia">Latvia</SelectItem>
                  <SelectItem value="lebanon">Lebanon</SelectItem>
                  <SelectItem value="lesotho">Lesotho</SelectItem>
                  <SelectItem value="liberia">Liberia</SelectItem>
                  <SelectItem value="libya">Libya</SelectItem>
                  <SelectItem value="liechtenstein">Liechtenstein</SelectItem>
                  <SelectItem value="lithuania">Lithuania</SelectItem>
                  <SelectItem value="luxembourg">Luxembourg</SelectItem>
                  <SelectItem value="macedonia">North Macedonia</SelectItem>
                  <SelectItem value="madagascar">Madagascar</SelectItem>
                  <SelectItem value="malawi">Malawi</SelectItem>
                  <SelectItem value="malaysia">Malaysia</SelectItem>
                  <SelectItem value="maldives">Maldives</SelectItem>
                  <SelectItem value="mali">Mali</SelectItem>
                  <SelectItem value="malta">Malta</SelectItem>
                  <SelectItem value="marshall">Marshall Islands</SelectItem>
                  <SelectItem value="mauritania">Mauritania</SelectItem>
                  <SelectItem value="mauritius">Mauritius</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="micronesia">Micronesia</SelectItem>
                  <SelectItem value="moldova">Moldova</SelectItem>
                  <SelectItem value="monaco">Monaco</SelectItem>
                  <SelectItem value="mongolia">Mongolia</SelectItem>
                  <SelectItem value="montenegro">Montenegro</SelectItem>
                  <SelectItem value="morocco">Morocco</SelectItem>
                  <SelectItem value="mozambique">Mozambique</SelectItem>
                  <SelectItem value="myanmar">Myanmar</SelectItem>
                  <SelectItem value="namibia">Namibia</SelectItem>
                  <SelectItem value="nauru">Nauru</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="netherlands">Netherlands</SelectItem>
                  <SelectItem value="new-zealand">New Zealand</SelectItem>
                  <SelectItem value="nicaragua">Nicaragua</SelectItem>
                  <SelectItem value="niger">Niger</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="norway">Norway</SelectItem>
                  <SelectItem value="oman">Oman</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="palau">Palau</SelectItem>
                  <SelectItem value="panama">Panama</SelectItem>
                  <SelectItem value="papua">Papua New Guinea</SelectItem>
                  <SelectItem value="paraguay">Paraguay</SelectItem>
                  <SelectItem value="peru">Peru</SelectItem>
                  <SelectItem value="philippines">Philippines</SelectItem>
                  <SelectItem value="poland">Poland</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="qatar">Qatar</SelectItem>
                  <SelectItem value="romania">Romania</SelectItem>
                  <SelectItem value="russia">Russia</SelectItem>
                  <SelectItem value="rwanda">Rwanda</SelectItem>
                  <SelectItem value="saint-kitts">
                    Saint Kitts and Nevis
                  </SelectItem>
                  <SelectItem value="saint-lucia">Saint Lucia</SelectItem>
                  <SelectItem value="saint-vincent">
                    Saint Vincent and the Grenadines
                  </SelectItem>
                  <SelectItem value="samoa">Samoa</SelectItem>
                  <SelectItem value="san-marino">San Marino</SelectItem>
                  <SelectItem value="sao-tome">
                    Sao Tome and Principe
                  </SelectItem>
                  <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                  <SelectItem value="senegal">Senegal</SelectItem>
                  <SelectItem value="serbia">Serbia</SelectItem>
                  <SelectItem value="seychelles">Seychelles</SelectItem>
                  <SelectItem value="sierra-leone">Sierra Leone</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="slovakia">Slovakia</SelectItem>
                  <SelectItem value="slovenia">Slovenia</SelectItem>
                  <SelectItem value="solomon-islands">
                    Solomon Islands
                  </SelectItem>
                  <SelectItem value="somalia">Somalia</SelectItem>
                  <SelectItem value="south-africa">South Africa</SelectItem>
                  <SelectItem value="south-sudan">South Sudan</SelectItem>
                  <SelectItem value="spain">Spain</SelectItem>
                  <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                  <SelectItem value="sudan">Sudan</SelectItem>
                  <SelectItem value="suriname">Suriname</SelectItem>
                  <SelectItem value="swaziland">Swaziland</SelectItem>
                  <SelectItem value="sweden">Sweden</SelectItem>
                  <SelectItem value="switzerland">Switzerland</SelectItem>
                  <SelectItem value="syria">Syria</SelectItem>
                  <SelectItem value="taiwan">Taiwan</SelectItem>
                  <SelectItem value="tajikistan">Tajikistan</SelectItem>
                  <SelectItem value="tanzania">Tanzania</SelectItem>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="togo">Togo</SelectItem>
                  <SelectItem value="tonga">Tonga</SelectItem>
                  <SelectItem value="trinidad">Trinidad and Tobago</SelectItem>
                  <SelectItem value="tunisia">Tunisia</SelectItem>
                  <SelectItem value="turkey">Turkey</SelectItem>
                  <SelectItem value="turkmenistan">Turkmenistan</SelectItem>
                  <SelectItem value="tuvalu">Tuvalu</SelectItem>
                  <SelectItem value="uganda">Uganda</SelectItem>
                  <SelectItem value="ukraine">Ukraine</SelectItem>
                  <SelectItem value="uae">United Arab Emirates</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uruguay">Uruguay</SelectItem>
                  <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
                  <SelectItem value="vanuatu">Vanuatu</SelectItem>
                  <SelectItem value="vatican">Vatican City</SelectItem>
                  <SelectItem value="venezuela">Venezuela</SelectItem>
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                  <SelectItem value="yemen">Yemen</SelectItem>
                  <SelectItem value="zambia">Zambia</SelectItem>
                  <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input
                id="dob"
                type="date"
                className="bg-transparent"
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
              />
            </div>

            {/* Updated Password Fields */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisibility.password ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-transparent"
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
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
                  <span className="sr-only">
                    {passwordVisibility.password
                      ? "Hide password"
                      : "Show password"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  className="bg-transparent"
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
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
                    {passwordVisibility.confirmPassword
                      ? "Hide password"
                      : "Show password"}
                  </span>
                </button>
              </div>
              {!passwordsMatch && formData.confirmPassword !== "" && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                className="border border-white"
                id="terms"
                onCheckedChange={(checked) =>
                  handleInputChange("termsAccepted", checked === true)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree with the term of service and privacy policy{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="btn mt-3"
              disabled={
                !passwordsMatch ||
                !formData.password ||
                !formData.confirmPassword ||
                !formData.termsAccepted ||
                mutation.isPending
              }
            >
              {mutation.isPending ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-sm text-center text-gray-400">
              Do you have account?{" "}
              <a href="/login" className="text-purple-400 hover:underline">
                Log in
              </a>
            </p>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="btn-outline bg-transparent">
                <Image
                  src="/assets/img/google.png"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Continue With Google
              </Button>
              <Button variant="outline" className="btn-outline bg-transparent">
                <Image
                  src="/assets/img/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
                Continue With Facebook
              </Button>
            </div> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
