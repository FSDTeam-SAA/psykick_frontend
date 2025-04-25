"use client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

// Schema for validation
const schema = z
  .object({
    // currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setToken(token);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  console.log(token);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/update-password`,
        {
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      reset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container w-full">
      <div className="bg-[#FFFFFF1A] shadow-lg overflow-hidden rounded-xl">
        <div
          className="text-white w-full mb-5"
          style={{
            background: "linear-gradient(90deg, #8F37FF 0%, #2D17FF 100%)",
          }}
        >
          <div className="flex justify-between items-center py-7 px-5">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <Link href="/profile">
              <button className="flex gap-2 rounded-tr-[24px] rounded-bl-[24px] border py-3 px-5">
                <ArrowLeft /> Back to Profile
              </button>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-5"
        >
          <div className="bg-[#FFFFFF1A] rounded-lg p-5 flex flex-col gap-8">
            {/* Current Password */}
            {/* <div>
              <label className="text-white font-normal text-[16px]">
                Current Password
              </label>
              <input
                type="password"
                {...register("currentPassword")}
                placeholder="Enter your current password"
                className="w-full border mt-2 text-[#F4EBFF] placeholder:text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-4"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div> */}

            {/* New Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-white font-normal text-[16px]">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={eye ? "text" : "password"}
                    {...register("newPassword")}
                    placeholder="Please enter your new password"
                    className="w-full border mt-2 text-[#F4EBFF] text-[16px] font-normal placeholder:text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-4"
                  />
                  {eye ? (
                    <EyeOff
                      onClick={() => setEye(false)}
                      className="text-white absolute top-[44%] right-4 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setEye(true)}
                      className="text-white absolute top-[44%] right-4 cursor-pointer"
                    />
                  )}
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-white font-normal text-[16px]">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={eye2 ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Please confirm your new password"
                    className="w-full border mt-2 text-[#F4EBFF] text-[16px] font-normal placeholder:text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-4"
                  />
                  {eye2 ? (
                    <EyeOff
                      onClick={() => setEye2(false)}
                      className="text-white absolute top-[44%] right-4 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setEye2(true)}
                      className="text-white absolute top-[44%] right-4 cursor-pointer"
                    />
                  )}
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-outline">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
