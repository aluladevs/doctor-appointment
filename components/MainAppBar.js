import IconButton from "./IconButton";
import {BellIcon} from "@heroicons/react/outline";
import Avatar from "./Avatar";

export default function MainAppBar({ title, subtitle }) {
    return (
        <div className="px-5 pt-4 mb-4 flex justify-between">
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
                    <IconButton>
                        <BellIcon className="h-5 w-5 text-gray-700"/>
                    </IconButton>
                </div>
                <Avatar text="Putri" className="cursor-pointer"/>
            </div>
        </div>
    )
}