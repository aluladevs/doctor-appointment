import {useState} from "react";
import {SelectorIcon} from "@heroicons/react/outline";

export default function SmallSelect(props) {
    const { name, options, label, onChange } = props;
    const [open, setOpen] = useState(false);

    const handleChange = (value) => {
        setOpen(false);
        onChange(name, value);
    };

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-16 pb-1 text-xs flex items-center justify-between">
                {label}
                <SelectorIcon className="h-4 w-4 text-gray-400"/>
            </button>
            {open && (
                <div className="absolute z-10 p-3 border border-gray-300 bg-white rounded-lg shadow-md">
                    {options.map((e, i) => (
                        <div
                            key={i}
                            onClick={() => handleChange(e)}
                            className="mb-2 cursor-pointer">
                            {e.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}