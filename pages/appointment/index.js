import MainLayout from "../../components/MainLayout";
import Calendar from "../../components/Calendar";
import Card from "../../components/Card";
import {useEffect, useState} from "react";
import moment from "moment";
import {AppointmentService, AvailableService} from "../../services";
import * as yup from "yup";
import {useFormik} from "formik";
import {groupedByDate} from "../../lib/date";
import SlotModal from "../../components/pages/appointment/SlotModal";
import DetailModal from "../../components/pages/appointment/DetailModal";

export default function Appointment() {

    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [appointments, setAppointments] = useState([]);
    const [appointmentCount, setAppointmentCount] = useState({});
    const [selectedAppointment, setSelectedAppointment] = useState([]);
    const [slotModal, setSlotModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [slots, setSlots] = useState([]);

    const validationSchema = yup.object().shape({
        doctor: yup.object().required("Doctors is required"),
        date: yup.string().required("Date is required"),
        slot: yup.object().required("Slot time is required"),
        name: yup.string().required("Patient name is required"),
        contact: yup.string().required("Patient contact is required"),
    });

    const formik = useFormik({
        initialValues: {
            doctor: '', date: moment().format("YYYY-MM-DD"), slot: {}, name: '', email: '', contact: ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    useEffect(() => {
        fetchAppointment();
    }, []);

    useEffect(() => {
        if (formik.values.doctor.uid && selectedDate) {
            changeDoctor(formik.values.doctor.uid);
        }

        setSelectedAppointment(appointments[selectedDate] ?? []);

    }, [formik.values.doctor, selectedDate, appointments]);

    useEffect(() => {
        const patient = formik.values?.patient;

        if (patient) {
            formik.setFieldValue('name', patient.user.name);
            formik.setFieldValue('email', patient.user.email);
            formik.setFieldValue('phoneCode', patient.user?.phoneCode);
            formik.setFieldValue('contact', patient.user?.contact);
        }
    }, [formik.values.patient]);

    const fetchAppointment = () => {
        AppointmentService.GetAppointments()
            .then(res => {
                setAppointments(groupedByDate(res.data.data));

                const group = groupedByDate(res.data.data);

                Object.keys(group).forEach(key => {
                    return group[key] = group[key].length;
                });

                setAppointmentCount(group);
            })
    }

    const changeDoctor = (uid) => {
        AvailableService.GetAvailableByDoctorDate(uid, selectedDate)
            .then(res => {
                const dataSlots = res.data?.slots ?? [];

                const usedSlot = [];
                Object.keys(appointments).forEach(key => {
                    appointments[key].forEach(e => {
                        usedSlot.push(e.slot);
                    })
                });

                setSlots(dataSlots.filter(e => !usedSlot.find(item => item._id === e._id)));
            });
    }

    const changeDate = (date) => {
        setSelectedDate(date);
    }

    const handleSubmit = (values) => {
        AppointmentService.CreateAppointment({
            ...values,
            doctor: values.doctor._id,
            ...(values.patient && {
                patient: values.patient._id
            })
        }).then(res => {
            if (res.data) {
                formik.resetForm();
                setSlotModal(false);
                fetchAppointment();
            }
        });
    }

    const handleDelete = () => {
        AppointmentService.DeleteAppointment(selectedDetail._id)
            .then(res => {
                if (res.data?.success) {
                    setSelectedDetail(null);
                    fetchAppointment();
                }
            });
    };

    return (
        <MainLayout title="Appointment">
            <Card>
                <div className="grid grid-cols-3 gap-4">
                    <Calendar
                        className="col-span-2"
                        cellLabel="appointment"
                        selectedDate={selectedDate}
                        onClick={changeDate}
                        data={appointmentCount}/>
                    <div className="mx-4 my-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-600">Appointment</h3>
                            <p className="font-semibold">{moment(selectedDate).format("DD MMM YYYY")}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                className="h-10 w-full mb-4 col-span-2 bg-primary rounded-xl text-sm text-white"
                                onClick={() => setSlotModal(true)}>Add Appointment</button>
                        </div>
                        <div>
                            {selectedAppointment.map((e, i) => (
                                <button
                                    key={i}
                                    className="w-full p-4 flex justify-between border-2 border-gray-200 rounded-3xl"
                                    onClick={() => setSelectedDetail(e)}>
                                    <div>
                                        <h2 className="text-lg font-medium">{e.doctor?.name}</h2>
                                        <p className="text-sm">Patient: {e.name}</p>
                                    </div>
                                    <p className="text-primary font-semibold">{e.slot?.start} - {e.slot?.end}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <SlotModal
                    open={slotModal}
                    formik={formik}
                    slots={slots}
                    date={selectedDate}
                    onClose={() => setSlotModal(false)}/>

                <DetailModal
                    open={Boolean(selectedDetail)}
                    data={selectedDetail}
                    onClose={() => setSelectedDetail(null)}
                    onCancel={handleDelete}/>
            </Card>
        </MainLayout>
    )
}