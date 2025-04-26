"use client";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type EditProfileFormData = {
  fullname: string;
  phoneNumber?: string;
  screenName: string;
  dob: string;
  country: string;
};

export default function EditProfileForm() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setToken(token);
  }, []);

  const { register, handleSubmit } = useForm<EditProfileFormData>();

  const editerProfile = async (data: EditProfileFormData) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/update-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <Link href="/profile">
              <button className="flex gap-2 rounded-tr-[24px] rounded-bl-[24px] border py-3 px-5">
                <ArrowLeft /> Back to Profile
              </button>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(editerProfile)}
          className="flex flex-col gap-4 p-5"
        >
          <div className="bg-[#FFFFFF1A] rounded-lg p-5 flex flex-col gap-6">
            {/* Full Name */}
            <div>
              <label className="text-white font-normal text-[16px]">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullname")}
                placeholder="Enter your full name"
                className="w-full border mt-2 text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-2"
              />
            </div>
            <div>
              <label className="text-white font-normal text-[16px]">
                Screen Name
              </label>
              <input
                type="text"
                {...register("screenName")}
                placeholder="Enter your full name"
                className="w-full border mt-2 text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-2"
              />
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="text-white font-normal text-[16px]">
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  placeholder="phoneNumber"
                  className="w-full border mt-2 text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-2"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-white font-normal text-[16px]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full border mt-2 text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-2"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-white font-normal text-[16px]">
                Country
              </label>
              <input
                type="text"
                {...register("country")}
                placeholder="USA"
                className="w-full border mt-2 text-[#F4EBFF] border-[#C5C5C5] bg-transparent rounded-md p-2"
              />
            </div>

            {/* Submit */}
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
}
