import moment from "moment";
import {useEffect, useState} from "react";
import {generateDays} from "../lib/date";

export default function Calendar() {
    const [year, setYear] = useState(moment().month());
    const [month, setMonth] = useState(moment().month());

    // console.log(year);

    useEffect(() => {
        generateDays(year, month);
    }, []);

    const changeMonth = (type, data) => {

    };

    const changeDate = (item) => {

    };

    return (
        <div>
            Calendar
        </div>
    )
}