import moment from "moment";
import {useEffect, useState} from "react";
import {generateDays} from "../lib/date";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";

export default function Calendar({ className, cellClassName, cellLabel, onClick, selectedDate, data }) {
    const months = Array(12).fill('').map((e, i) => moment(`2021-${i+1}`).format("MMMM"));
    const years = Array(moment().year() - 1920).fill('').map((e, i) => 1920 + (i + 1)).reverse();
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());

    const [days, setDays] = useState([]);

    const [openYear, setOpenYear] = useState(false);

    useEffect(() => {
        const data = generateDays(year, month);

        setDays(data);
    }, [year, month]);

    const changeMonth = (type) => {
        if (type === "next") {
            setYear(month === 11 ? year + 1 : year);
            setMonth(month === 11 ? 0 : month + 1);
        } else {
            setYear(month === 0 ? year - 1 : year);
            setMonth(month === 0 ? 11 : month - 1);
        }
    };

    return (
        <div className={`my-4 ${className ?? ''}`}>
            <div className="flex items-center justify-between">
                <button className="p-2 rounded-xl bg-primary" onClick={() => changeMonth('prev')}>
                    <ChevronLeftIcon className="h-5 w-5 text-white"/>
                </button>
                <h5 className="relative text-lg">
                    {months[month]} <button className="font-semibold" onClick={() => setOpenYear(!openYear)}>{year}</button>
                    {openYear && (
                        <div className="max-h-52 w-32 mt-2 overflow-auto absolute right-0 bg-white shadow rounded-xl">
                            {years.map((e, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setYear(e);
                                        setOpenYear(false);
                                    }}
                                    className="h-10 w-full px-5 text-sm">{e}</button>
                            ))}
                        </div>
                    )}
                </h5>
                <button className="p-2 rounded-xl bg-primary" onClick={() => changeMonth('next')}>
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
                        <div key={j}
                                onClick={() => onClick(item.date)}
                        className={`lg:h-28 md:h-1/6 w-1/6 p-2 m-0.5 flex flex-col justify-between rounded-lg text-sm bg-gray-50 cursor-pointer border-2
                         ${item.isCurrentMonth ? 'font-semibold text-gray-600' : 'text-gray-400'}
                         ${item.isToday && 'bg-blue-50'}
                         ${item.date === selectedDate ? 'border-primary bg-blue-100' : 'border-transparent'}
                         ${cellClassName ?? ''}`}>
                            <p className="ml-2 mt-2">{item.day}</p>

                            {data && data.hasOwnProperty(item.date) && (
                                <p className="text-xs text-right text-gray-400">
                                    <span className="font-bold text-primary">{data[item.date] > 10 ? '10+' : data[item.date]}</span> {cellLabel ?? 'meets'}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}