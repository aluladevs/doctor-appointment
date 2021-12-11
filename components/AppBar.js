import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.svg";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/client";

export default function AppBar({ isScroll }) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        getSession().then(res => {
            if (res) {
                setIsAuth(true);
            }
        })
    }, []);
    return (
        <div className={`fixed w-full flex justify-between py-3 px-10 z-40
         ${isScroll ? "bg-white shadow-md" : ""}`}>
            <Image src={Logo} width={160} height={60}/>

            <div className="flex items-center gap-4">
                <Link href="/about">
                    <button className="py-2.5 px-7 text-gray-700 text-sm">About</button>
                </Link>
                <Link href="/doctor">
                    <button className="py-2.5 px-7 text-gray-700 text-sm">Our Doctors</button>
                </Link>
                {isAuth && (
                    <Link href="/dashboard">
                        <button className="h-12 px-7 text-white bg-primary rounded-xl">Dashboard</button>
                    </Link>
                )}
                {!isAuth && (
                    <Link href="/login">
                        <button className="py-2.5 px-7 text-primary text-sm">Login</button>
                    </Link>
                )}
                {!isAuth && (
                    <Link href="/register">
                        <button className="h-12 px-7 text-white bg-primary rounded-xl">Get Started</button>
                    </Link>
                )}
            </div>
        </div>
    )
}