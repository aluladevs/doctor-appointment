import moment from "moment";
import {useEffect, useState} from "react";
import {generateDays} from "../lib/date";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";

export default function Calendar({ className, cellClassName, onClick, selectedDate }) {
    const months = Array(12).fill('').map((e, i) => moment(`2021-${i+1}`).format("MMMM"));
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());

    const [days, setDays] = useState([]);
    // console.log(year);

    useEffect(() => {
        const data = generateDays(year, month);

        setDays(data);
    }, []);

    const changeMonth = (type, data) => {

    };

    const changeDate = (item) => {

    };
    console.log(days, selectedDate)
    return (
        <div className={`my-4 ${className ?? ''}`}>
            <div className="flex items-center justify-between">
                <button className="p-2 rounded-xl bg-primary">
                    <ChevronLeftIcon className="h-5 w-5 text-white"/>
                </button>
                <h5>{`${months[month]} ${year}`}</h5>
                <button className="p-2 rounded-xl bg-primary">
                    <ChevronRightIcon className="h-5 w-5 text-white"/>
                </button>
            </div>
            <hr className="my-4"/>
            <div className="flex justify-between">
                {dayNames.map((e, i) => (
                    <div key={i} className="w-1/6 py-2.5 text-center text-xs font-semibold text-gray-500">{e}</div>
                ))}
            </div>
            {days.map((e, i) => (
                <div key={i} className="flex justify-between">
                    {e.map((item, j) => (
                        <p key={j}
                                onClick={() => onClick(item.date)}
                        className={`h-20 w-1/6 p-4 m-0.5 rounded-lg text-sm bg-gray-50 cursor-pointer border-2
                         ${item.isCurrentMonth ? 'font-medium text-gray-600' : 'text-gray-400'}
                         ${item.date === selectedDate ? 'border-primary bg-blue-100' : 'border-transparent'}
                         ${cellClassName ?? ''}`}>{item.day}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}