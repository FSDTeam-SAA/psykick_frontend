import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import React from "react";

const Logout: React.FC<{
  logoutOpen: boolean;
  setShowLogout: (open: boolean) => void;
}> = ({ logoutOpen, setShowLogout }) => {
  const {logout} = useAuth()
  return (
    <div className="relative">
      <Dialog open={logoutOpen} onOpenChange={setShowLogout}>
        <DialogContent className="bg-[#FFFFFF33] dashboard-shadow">
          <Image
            className=""
            alt="logoutimage"
            src="/assets/img/logout.png"
            width={500}
            height={500}
          />
          <DialogHeader className="absolute flex flex-col items-center justify-center top-32 ">
            <DialogTitle className="background-[#F4EBFF] text-white font-semibold text-2xl">
              Are you sure you want to log out?
            </DialogTitle>
            <DialogDescription className="text-center font-normal text-[17px] py-6 text-white">
              We hope you had a great time! Thank you for being part of the
              Psykick club. See you soon!
            </DialogDescription>
            <div className="flex flex-col gap-4 ">
              <button onClick={() => logout()}  className="btn-outline">YES</button>
              <button onClick={()=>setShowLogout(false)} className="btn-outline btn">NO</button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Logout;
