import {useState} from "react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";

export default function Select(props) {
    const { options, value, name, label, selected, onChange, className, useSearch } = props;
    const [open, setOpen] = useState(false);
    console.log(value, selected)
    return (
        <div className={className}>
            <p className="text-sm">{label}</p>
            <div className="relative">
                <button type="button" onClick={() => setOpen(!open)}
                        className="h-11 relative w-full bg-gray-100 rounded-xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm">
                          <span className="block truncate">{selected}</span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400"/>
                    </span>
                </button>
                {open && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        tabIndex="-1" role="listbox" aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3">
                        {useSearch && (
                            <li className="p-2">
                                <input className="p-2 border-2 rounded-md h-8 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </li>
                        )}
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
            </div>
        </div>
    )
}