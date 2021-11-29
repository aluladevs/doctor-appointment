import {useEffect, useState} from "react";
import moment from "moment";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {CalendarIcon} from "@heroicons/react/outline";

export default function Datepicker({ label, name, value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
    const [year, setYear] = useState(moment().year());
    const [calendar, setCalendar] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const today = moment().format("YYYY-MM-DD");
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    useEffect(() => {
        if (value) {
            setSelectedDate(moment(value).format("YYYY-MM-DD"));
        }
    }, [value]);

    const nextMonth = () => {
        if (selectedMonth < 12) {
            setSelectedMonth(selectedMonth + 1);
        } else {
            setYear(year + 1);
            setSelectedMonth(1);
        }
    };

    const prevMonth = () => {
        if (selectedMonth === 1) {
            setYear(year - 1);
            setSelectedMonth(12);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const generateDays = () => {
        const numOfDays = moment(`${year}-${selectedMonth}`).daysInMonth();
        let numOfPrevDays = moment(`${year}-${selectedMonth - 1}`).daysInMonth();

        if (selectedMonth === 1) {
            numOfPrevDays = moment(`${year - 1}-12`).daysInMonth();
        }

        const detail = [];
        let num = 1;

        for (let i = 0; i < 6; i++) {
            const row = [];

            let numDayInWeek = 1;
            for (let j = 0; j < 7; j++) {
                const firstDay = moment(`${year}-${selectedMonth}`).format('e');

                if (i === 0 && j < firstDay) {
                    row.push({
                        isCurrentMonth: false,
                        day: (numOfPrevDays - firstDay) + (j + 1),
                        date: moment(`${year}-${selectedMonth}-${(numOfPrevDays - firstDay) + (j + 1)}`).format("YYYY-MM-DD")
                    });
                } else if (num > numOfDays) {
                    if (j < 7 && j > 0) {
                        row.push({
                            isCurrentMonth: false,
                            day: numDayInWeek,
                            date: moment(`${year}-${selectedMonth + 1}-${numDayInWeek}`).format("YYYY-MM-DD")
                        });
                        numDayInWeek++;
                    } else {
                        break;
                    }
                } else {
                    row.push({
                        isCurrentMonth: true,
                        day: num,
                        date: moment(`${year}-${selectedMonth}-${num}`).format("YYYY-MM-DD")
                    });
                    num++;
                }
            }

            detail.push(row);
        }

        setCalendar(detail);
    };

    useEffect(() => {
        generateDays();
    }, [selectedMonth]);

    return (
        <div>
            <p className="text-xs">{label}</p>
            <button type="button" onClick={() => setOpen(!open)}
                    className="h-11 relative w-full bg-gray-100 rounded-xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm">
                <span className="block truncate">{selectedDate}</span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400"/>
                    </span>
            </button>

            {open && (
                <div className="w-72 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 absolute z-10">
                    <div className="p-2 flex justify-between items-center rounded-lg">
                        <button className="p-1 bg-gray-100 rounded-md" onClick={prevMonth}>
                            <ChevronLeftIcon className="h-5 w-5 text-gray-700"/>
                        </button>
                        <p className="text-sm font-semibold">{moment(`${year}-${selectedMonth}`).format("MMMM YYYY")}</p>
                        <button className="p-1 bg-gray-100 rounded-md" onClick={nextMonth}>
                            <ChevronRightIcon className="h-5 w-5 text-gray-700"/>
                        </button>
                    </div>

                    <div className="mt-3 p-2">
                        <div className="flex justify-between">
                            {days.map((e, i) => (
                                <p key={i} className="w-10 text-sm text-center font-semibold">{e}</p>
                            ))}
                        </div>
                        {calendar.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                {item.map((e, j) => (
                                    <button
                                        key={j}
                                        onClick={() => {
                                            onChange({target: { name, value: e.date}});
                                            setSelectedDate(e.date);
                                            setOpen(!open)
                                        }}
                                        className={`h-10 w-10 p-1 rounded-lg text-center text-sm
                                        ${!e.isCurrentMonth && 'text-gray-400'}
                                        ${e.date === today && 'bg-blue-200'}`}>
                                        {e.day}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-0.5 text-xs text-red-700">{error}</p>
            )}
        </div>
    )
}