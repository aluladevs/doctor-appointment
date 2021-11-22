import Link from "next/link";
import IconButton from "./IconButton";
import {BellIcon, LogoutIcon, UserIcon} from "@heroicons/react/outline";
import Avatar from "./Avatar";
import {useState} from "react";
import {signOut} from "next-auth/client";

export default function MainAppBar({ title, subtitle, isScroll }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/"
        });
    };

    return (
        <div className={`fixed z-10 right-0 w-11/12 px-10 py-4 pl-40 flex justify-between items-center
        ${isScroll ? "shadow-lg bg-white" : "bg-primary-light"}`}>
            <div>
                {title && (
                    <h1 className="text-2xl font-semibold">{title}</h1>
                )}
                {subtitle && (
                    <p className="text-sm">{subtitle}</p>
                )}
            </div>
            <div className="flex gap-7">
                <div>
                    <IconButton onClick={() => setNotifOpen(!notifOpen)}>
                        <BellIcon className="h-5 w-5 text-gray-700"/>
                    </IconButton>
                </div>
                <Avatar text="Putri" className="cursor-pointer" onClick={() => setAccountOpen(!accountOpen)}/>
            </div>

            {notifOpen && (
                <div className="absolute bg-white shadow rounded-2xl right-24 top-20">
                    <div className="mx-6 my-3 py-3 border-b">
                        <h1 className="font-semibold">User new notification</h1>
                        <p className="text-sm text-gray-500">Dr. Jane receive new appointment on Sunday, 21 Nov at 18:00</p>
                    </div>
                </div>
            )}

            {accountOpen && (
                <div className="absolute bg-white shadow rounded-xl right-10 top-20 py-2.5">
                    <div className="w-44 flex py-2.5 px-5">
                        <UserIcon width={20}/>
                        <button>Profile</button>
                    </div>
                    <div className="w-44 flex py-2.5 px-5" onClick={handleSignOut}>
                        <LogoutIcon width={20}/>
                        <button>Logout</button>
                    </div>
                </div>
            )}
        </div>
    )
}