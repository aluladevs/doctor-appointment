import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import DoctorIllustration from "../assets/doctor-illustration.svg";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import {useEffect, useState} from "react";
import {DoctorService} from "../services";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        DoctorService.GetDoctors()
            .then(res => {
                setDoctors(res.data.data);
            })
    }, []);

    return (
        <Layout>
            <Head>
                <title>Enkindle - Doctors Appointment</title>
                <meta name="description" content="Enkindle - Doctors Appointment" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className="w-full pt-24 pb-14 flex justify-center items-center gap-10">
                <Image src={DoctorIllustration}/>
                <h1 className="mb-5 text-8xl text-primary font-semibold">Our Doctors</h1>
            </div>
            <div className="w-5/6 lg:w-3/4 mx-auto text-center">
                <div className="m-5 grid grid-cols-4 gap-4">
                    {doctors.map((e, i) => (
                        <Card key={i} className="text-center">
                            {e.user?.avatar ? (
                                <Image alt="avatar" src={e.user?.avatar} width={128} height={128} className="rounded-full"/>
                            ) : (
                                <Avatar text={e.name} className="h-32 w-32 my-6 text-5xl"/>
                            )}
                            <h2 className="my-2 text-lg font-medium">{e.name}</h2>
                            <div className="my-4 flex flex-wrap gap-4 justify-center">
                                {e.specialization.map((item, j) => (
                                    <span key={j} className="py-1 px-3 text-sm text-primary text-xs font-semibold rounded-xl bg-gray-50">{item.name}</span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    )
}