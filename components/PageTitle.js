import IconButton from "./IconButton";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";

export default function PageTitle({ title, subtitle, useBack }) {
    const router = useRouter();

    return (
        <div className="mb-8 flex items-center gap-4">
            {useBack && (
                <IconButton onClick={() => router.back()}>
                    <ArrowLeftIcon className="h-6 w-6"/>
                </IconButton>
            )}
            <div>
                {title && (
                    <h1 className="text-2xl font-semibold">{title}</h1>
                )}
                {subtitle && (
                    <p className="text-sm">{subtitle}</p>
                )}
            </div>
        </div>
    )
}