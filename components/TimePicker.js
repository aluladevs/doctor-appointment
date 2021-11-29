import Select from "./Select";
import {useEffect, useState} from "react";

export default function TimePicker({ label, name, value, onChange }) {
    const hours = Array(24).fill('').map((e, i) => ({ name: i.toString().padStart(2, '0') }));
    const minutes = Array(13).fill('').map((e, i) => ({ name: (i * 5).toString().padStart(2, '0') }));

    const [hour, setHour] = useState(hours[0]);
    const [minute, setMinute] = useState(minutes[0]);

    useEffect(() => {
        if (value) {
            const currHour = hours.find(e => e.name === value.split(':')[0]);
            const currMinute = minutes.find(e => e.name === value.split(':')[1]);

            setHour(currHour);
            setMinute(currMinute);
        }
    }, [value]);

    const handleChangeHour = ({ target }) => {
        if (onChange) {
            onChange({target: { name, value: `${target.value.name}:${minute.name}` }});
        }
    };

    const handleChangeMinute = ({ target }) => {
        if (onChange) {
            onChange({target: { name, value: `${hour.name}:${target.value.name}` }});
        }
    };

    return (
        <div>
            <p className="text-xs">{label}</p>
            <div className="flex items-center">
                <div className="w-24">
                    <Select
                        options={hours}
                        value={hour}
                        onChange={handleChangeHour}/>
                </div>
                <p className="px-2 text-lg text-gray-600">:</p>
                <div className="w-24">
                    <Select
                        options={minutes}
                        value={minute}
                        onChange={handleChangeMinute}/>
                </div>
            </div>
        </div>
    )
}