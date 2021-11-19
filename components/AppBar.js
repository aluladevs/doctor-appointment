import Link from "next/link";
import {useEffect, useState} from "react";

export default function AppBar() {
    const [scroll, setScroll] = useState(false);

    const changeScroll = () => {
        if (window.scrollY > 927) {
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
        <div className="fixed w-full flex justify-between py-3 px-10 bg-transparent z-40">
            <div className="text-lg">Logo</div>

            <div className="flex">
                <Link href="/">
                    <button className="py-2.5 px-5">Home</button>
                </Link>
            </div>
        </div>
    )
}