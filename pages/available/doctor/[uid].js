import MainLayout from "../../../components/MainLayout";
import Card from "../../../components/Card";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {AvailableService} from "../../../services";
import Calendar from "../../../components/Calendar";

export default function Detail() {
    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
        if (uid) {
            // AvailableService.GetAvailableByDoctor(uid)
            //     .then(res => {
            //         console.log(res.data)
            //     })
        }
    }, [uid]);

    return (
        <MainLayout>
            <Card>
                <h1>Dr</h1>
                <Calendar/>
            </Card>
        </MainLayout>
    )
}