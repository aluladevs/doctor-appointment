import AppBar from "./AppBar";
import {useEffect, useState} from "react";
import Logo from "../assets/logo.svg";
import Image from "next/image";

export default function Layout({ children }) {
    const [scroll, setScroll] = useState(false);

    const changeScroll = () => {
        if (window.scrollY > 50) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeScroll);

        return () => window.removeEventListener('scroll', changeScroll);
    },[]);

    return (
        <div>
            <AppBar
                isScroll={scroll}/>

            <div>
                {children}
            </div>

            <footer className="mt-32 py-10 px-24 bg-primary-light flex justify-between items-start">
                <Image src={Logo} width={200} height={60}/>
                <div className="w-1/2">
                    <input
                        placeholder="Email Address"
                        className="w-full bg-white p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                    <button
                        className="py-2.5 px-4 mt-5 float-right rounded-xl bg-primary text-white text-sm opacity-75">
                        Subscribe
                    </button>
                </div>
            </footer>
        </div>
    )
}