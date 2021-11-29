import MainLayout from "../../components/MainLayout";
import Select from "../../components/Select";
import Datepicker from "../../components/Datepicker";
import * as yup from "yup";
import {useFormik} from "formik";
import {AvailableService, DoctorService} from "../../services";
import {useEffect, useState} from "react";
import Card from "../../components/Card";
import TimePicker from "../../components/TimePicker";
import {useRouter} from "next/router";

export default function Create() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);

    const validationSchema = yup.object().shape({
        doctor: yup.object().required("Please choose the doctor"),
        date: yup.date().required("Date is required")
    });

    const formik = useFormik({
        initialValues: {
            doctor: {}, date: '', start: '00:00', end: '00:00'
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            const params = {
                doctor: values.doctor._id,
                date: values.date,
                slots: slots
            };

            console.log(params)
            AvailableService.CreateAvailable(params)
                .then(res => {
                    if (res) {
                        router.push("/available");
                    }
                })
        }
    });

    useEffect(() => {
        DoctorService.GetDoctors()
            .then(res => {
                setDoctors(res.data ?? []);
            })
    }, []);

    const addSlot = () => {
        setSlots([
            ...slots,
            { start: formik.values.start, end: formik.values.end }
        ]);

        formik.setFieldValue('start', '00:00');
        formik.setFieldValue('end', '00:00');
    };
    console.log(formik.values, slots, formik.errors)
    return (
        <MainLayout>
            <Card>
                <form onSubmit={formik.handleSubmit}>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <div>
                            <Select
                                label="Select Doctor"
                                name="doctor"
                                options={doctors}
                                value={formik.values.doctor}
                                onChange={formik.handleChange}/>
                        </div>
                        <div>
                            <Datepicker
                                label="Date"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}/>
                        </div>
                    </div>
                    <div className="mt-10 mb-6">
                        <p className="text-lg mb-5">Add Slots Time</p>
                        <div className="flex items-end gap-4">
                            <TimePicker
                                label="Start at"
                                name="start"
                                value={formik.values.start}
                                onChange={formik.handleChange}/>
                            <h1 className="px-5 mt-4">-</h1>
                            <TimePicker
                                label="End at"
                                name="end"
                                value={formik.values.end}
                                onChange={formik.handleChange}/>
                            <button
                                onClick={addSlot}
                                type="button"
                                className="h-11 px-5 rounded-xl bg-primary text-white">
                                Add
                            </button>
                        </div>
                        <div className="mt-8 grid grid-cols-10 gap-4">
                            {slots.map((e, i) => (
                                <button key={i} className="h-11 border-2 border-gray-500 rounded-xl text-sm font-semibold text-gray-500">
                                    {`${e.start} - ${e.end}`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="py-2.5 px-6 bg-primary rounded-xl text-white text-sm">
                            Submit
                        </button>
                    </div>
                </form>
            </Card>
        </MainLayout>
    )
}