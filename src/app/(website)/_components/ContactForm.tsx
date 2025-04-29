// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
// import Link from "next/link";

// interface FormData {
//   fullName: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// export default function ContactForm() {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Contact Form Data:", formData);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen pt-8 lg:pt-20 p-4 flex flex-col items-center">
//       <div className="w-full max-w-4xl text-center mb-6">
//         <h1 className=" mb-4 title smallShadow">Contact Us</h1>
//         <p className="text-gray-300 text-sm md:text-base">
//           We&apos;d love to hear from you! Whether you&apos;re curious about the
//           game, need assistance, or want to share your experience, reach out to
//           us anytime.
//         </p>
//       </div>

//       <Card className="w-full bgBlure border-[2px] border-[#FDFDFD1A]/10 shadow-[#862A8533] shadow-xl bg-[#EEE1FF]/10 backdrop-blur-lg   max-w-4xl">
//         <CardHeader>
//           <CardTitle className=" challange-title">
//             We&apos;re Here to Help!
//           </CardTitle>
//           <p className="paragrap text-[#F4EBFF]">
//             Together, we can build a more equitable and prosperous gaming
//             community.
//           </p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <Input
//                 name="fullName"
//                 placeholder="Full Name*"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
//                 required
//               />

//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="Email address*"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
//                 required
//               />
//               <Input
//                 name="subject"
//                 placeholder="Subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
//                 required
//               />
//               <Textarea
//                 name="message"
//                 placeholder="Ask your Queries"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full min-h-[200px]  bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
//                 required
//               />
//             </div>

//             <div className="flex flex-col items-center gap-6">
//               <button
//                 type="submit"
//                 className="w-full btn md:w-auto px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
//               >
//                 Submit
//               </button>

//               {/* Social Icons  */}
//               <div className="flex gap-4">
//                 <Link href="#">
//                   <Button
//                     size="icon"
//                     className="rounded-full p-0 iconGradient border hover:border-none text-white"
//                     onClick={() =>
//                       window.open("https://facebook.com", "_blank")
//                     }
//                   >
//                     <Facebook className="h-5 w-5" />
//                   </Button>
//                 </Link>
//                 <Link href="#">
//                   <Button
//                     size="icon"
//                     className="rounded-full p-0 iconGradient border hover:border-none text-white"
//                     onClick={() =>
//                       window.open("https://facebook.com", "_blank")
//                     }
//                   >
//                     <Instagram className="h-5 w-5" />
//                   </Button>
//                 </Link>

//                 <Link href="#">
//                   <Button
//                     size="icon"
//                     className="rounded-full p-0 iconGradient border hover:border-none text-white"
//                     onClick={() =>
//                       window.open("https://facebook.com", "_blank")
//                     }
//                   >
//                     <Linkedin className="h-5 w-5" />
//                   </Button>
//                 </Link>
//                 <Link href="#">
//                   <Button
//                     size="icon"
//                     className="rounded-full p-0 border iconGradient hover:border-none text-white"
//                     onClick={() =>
//                       window.open("https://facebook.com", "_blank")
//                     }
//                   >
//                     <Twitter className="h-5 w-5" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import starImage from "../../../../public/assets/img/star.png";

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// Contact API call using fetch
const contactApi = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-us`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to send contact form");
  }

  return data;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: contactApi,
    onSuccess: (data) => {
      toast.success(data.message || "Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast.error( "Failed to send message");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen pt-8 lg:pt-20 p-4 flex flex-col items-center relative">
      <div className="absolute top-24 container">
        <Image src={starImage} width={400} height={300} alt="starImage" className="w-full" />
      </div>
      <div className="w-full max-w-4xl text-center mb-6 lg:mt-10">
        <h1 className="mb-4 title smallShadow">Contact Us</h1>
        <p className="text-gray-300 text-sm md:text-base">
          We&apos;d love to hear from you! Whether you&apos;re curious about the
          game, need assistance, or want to share your experience, reach out to
          us anytime.
        </p>
      </div>

      <Card className="w-full bgBlure border-[2px] border-[#FDFDFD1A]/10 shadow-[#862A8533] shadow-xl bg-[#EEE1FF]/10 backdrop-blur-lg max-w-4xl">
        <CardHeader>
          <CardTitle className="challange-title">
            We&apos;re Here to Help!
          </CardTitle>
          <p className="paragrap text-[#F4EBFF]">
            Together, we can build a more equitable and prosperous gaming
            community.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email address*"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
                required
              />
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
                required
              />
              <Textarea
                name="message"
                placeholder="Ask your Queries"
                value={formData.message}
                onChange={handleChange}
                className="w-full min-h-[200px] bg-[#F4EBFF]/10 !placeholder-[#F4EBFF] text-white focus:ring-0"
                required
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <button
                type="submit"
                className="w-full btn md:w-auto px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
                disabled={status === "pending"}
              >
                {status === "pending" ? "Submitting..." : "Submit"}
              </button>

              {/* Social Icons */}
              <div className="flex gap-4">
                <Link href="#">
                  <Button
                    size="icon"
                    className="rounded-full p-0 iconGradient border hover:border-none text-white"
                    onClick={() => window.open("https://facebook.com", "_blank")}
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="icon"
                    className="rounded-full p-0 iconGradient border hover:border-none text-white"
                    onClick={() => window.open("https://instagram.com", "_blank")}
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="icon"
                    className="rounded-full p-0 iconGradient border hover:border-none text-white"
                    onClick={() => window.open("https://linkedin.com", "_blank")}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="icon"
                    className="rounded-full p-0  iconGradient border hover:border-none text-white"
                    onClick={() => window.open("https://twitter.com", "_blank")}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
