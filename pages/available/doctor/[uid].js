import MainLayout from "../../../components/MainLayout";
import Card from "../../../components/Card";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AvailableService} from "../../../services";
import Calendar from "../../../components/Calendar";
import moment from "moment";

export default function Detail() {
    const router = useRouter();
    const { uid } = router.query;

    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

    useEffect(() => {
        if (uid) {
            // AvailableService.GetAvailableByDoctor(uid)
            //     .then(res => {
            //         console.log(res.data)
            //     })
        }
    }, [uid]);

    const changeDate = (value) => {
        setSelectedDate(value);
    }

    return (
        <MainLayout>
            <Card>
                <h1>Dr</h1>
                <div className="grid grid-cols-3 gap-4">
                    <Calendar
                        className="col-span-2"
                        selectedDate={selectedDate}
                        onClick={(value) => changeDate(value)}/>
                    <div>
                        List appointment
                    </div>
                </div>
            </Card>
        </MainLayout>
    )
}