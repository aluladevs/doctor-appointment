import {useState} from "react";
import {FilterIcon, SelectorIcon} from "@heroicons/react/outline";

export default function FilterDialog(props) {
    const { children } = props;
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-full h-11 px-4 flex items-center rounded-xl bg-gray-100 text-sm">
                <FilterIcon className="h-4 w-4 mr-2"/>
                Filters
                <SelectorIcon className="h-5 w-5 ml-4 text-gray-400"/>
            </button>

            {open && (
                <div className="w-72 absolute right-0 p-5 mt-2 rounded-xl bg-white shadow">
                    <h3 className="mb-5 text-lg">Filters</h3>

                    {children}
                </div>
            )}
        </div>
    )
}