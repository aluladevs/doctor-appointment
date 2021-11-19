import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {useState} from "react";

export default function SelectInput(props) {
    const { options, label, name, value, onChange } = props;
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            <p className="text-sm">{label}</p>
            <div className="flex">
                <button
                    onClick={() => setOpen(!open)}
                    className="h-11 w-1/5 pl-4 pr-2 flex items-center justify-between bg-gray-100 rounded-tl-xl rounded-bl-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm">
                    +62
                    <SelectorIcon className="h-5 w-5 text-gray-400"/>
                </button>
                {open && (
                    <ul className="absolute z-10 mt-12 bg-white shadow-lg max-h-56 rounded-xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        tabIndex="-1" role="listbox" aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3">
                        <li className="p-2">
                            <input className="p-2 border-2 rounded-md h-8 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"/>
                        </li>
                        {options.map((item, i) => (
                            <li key={i} className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                                id="listbox-option-0" onClick={() => onChange({target: {name, value: item}})}>
                                <div className="flex items-center">
                                    <span className="font-normal ml-3 block truncate">
                                        {item.name}
                                    </span>
                                </div>
                                {value === item && (
                                    <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                        <CheckIcon className="h-5 w-5"/>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <input
                    className="w-full h-11 px-4 ml-0.5 rounded-tr-xl rounded-br-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    {...props}/>
            </div>
        </div>
    )
}