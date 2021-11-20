import Image from "next/image";
import Logo from "../assets/logo.svg";
import MainAppBar from "./MainAppBar";
import {useRouter} from "next/router";
import Menus from "../constants/menu";
import {Component} from "react";

export default function MainLayout(props) {
    const { children, title, subtitle } = props;
    const { pathname } = useRouter();

    return (
        <div className="main flex">
            <div className="sidebar w-1/6 py-8 px-7 lg:block sm:hidden">
                <div className="text-lg mb-6">
                    <Image alt="logo" src={Logo} width={140} height={40}/>
                </div>
                {Menus.map(({name, path, icon: Component}, i) => (
                    <div key={i} className={`flex bg-${path === pathname ? "primary" : "transparent"} py-3.5 px-4 mb-2.5 rounded-2xl`}>
                        <Component width={20} className={`mr-2.5 ${path === pathname ? "text-white" : "text-gray-400"}`}/>
                        <p className={`${path === pathname ? "text-white" : "text-gray-400"} text-sm`}>{name}</p>
                    </div>
                ))}
            </div>
            <div className="md:w-5/6 md:ml-auto sm:w-full sm:m-0">
                <MainAppBar
                    title={title}
                    subtitle={subtitle}/>
                <div className="px-10 py-6 rounded-2xl mt-24">
                    {children}
                </div>
            </div>
        </div>
    )
}