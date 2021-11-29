import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";

export default function MultipleSelect(props) {
    const { options, name, label, value, onChange, className, useSearch, error } = props;

    const [open, setOpen] = useState(false);
    const [option, setOption] = useState(options);
    const [values, setValues] = useState([]);

    useEffect(() => {
        setOption(options);
    }, [options]);

    useEffect(() => {
        setValues(value);
    }, [value]);

    const changeSearch = (value) => {
        const condition = new RegExp(value.toLowerCase());

        const result = options.filter(function (el) {
            return condition.test(el.name?.toLowerCase());
        });

        setOption(result);
    }

    const selectOption = (value) => {
        let data = [...values];

        if (values.find(e => e === value)) {
            data = values.filter(e => e !== value);
        } else {
            data = [...data, value];
        }

        onChange({target: {name, value: data}});
    }

    return (
        <div className={className}>
            <p className="text-xs">{label}</p>
            <div className="relative">
                <button type="button" onClick={() => setOpen(!open)}
                        className="h-11 relative w-full bg-gray-100 rounded-xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm">
                    <span className="block truncate">{value?.map(e => e.name ?? '').join(', ')}</span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400"/>
                    </span>
                </button>
                {open && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {useSearch && (
                            <li className="p-2">
                                <input
                                    onChange={(e) => changeSearch(e.target.value)}
                                    className="p-2 border-2 rounded-md h-8 w-full focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"/>
                            </li>
                        )}
                        {option.map((item, i) => (
                            <li key={i} className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                                onClick={() => selectOption(item)}>
                                <div className="flex items-center">
                                    <span className="font-normal ml-3 block truncate">
                                        {item.name}
                                    </span>
                                </div>
                                {value.includes(item) && (
                                    <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                        <CheckIcon className="h-5 w-5"/>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && (
                <p className="mt-0.5 text-xs text-red-700">{error}</p>
            )}
        </div>
    )
}