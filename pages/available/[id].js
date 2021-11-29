import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {AvailableService} from "../../services";

export default function Detail() {
    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
        console.log(router.query);

        if (uid) {
            // AvailableService.GetAvailableByDoctor(uid)
            //     .then(res => {
            //         console.log(res.data)
            //     })
        }
    }, [router]);

    return (
        <MainLayout>
            <Card>
                <h1>Dr</h1>

                <div inlineDatepicker data-date="02/25/2022"/>
            </Card>
        </MainLayout>
    )
}