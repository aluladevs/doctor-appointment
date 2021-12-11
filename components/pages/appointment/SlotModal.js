import Select from "../../Select";
import Input from "../../Input";
import SelectInput from "../../SelectInput";
import countries from "../../../constants/countries";
import Datepicker from "../../Datepicker";
import TextArea from "../../TextArea";
import Modal from "../../Modal";
import {useEffect, useState} from "react";
import {DoctorService, PatientService} from "../../../services";

export default function SlotModal(props) {
    const { open, onClose, formik, date, slots } = props;
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        DoctorService.GetDoctors()
            .then(res => {
                setDoctors(res.data.data);
            });

        PatientService.GetPatients()
            .then(res => {
                setPatients(res.data.data);
            });
    }, []);

    useEffect(() => {
        if (date) {
            formik.setFieldValue('date', date);
        }
    }, [date]);

    return (
        <Modal
            className="w-full lg:w-1/2"
            open={open} title="Add New Appointment"
            onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        useSearch
                        label="Select Doctors"
                        name="doctor"
                        options={doctors}
                        value={formik.values.doctor}
                        onChange={formik.handleChange}/>
                    <Select
                        useSearch
                        label="Select Patient"
                        name="patient"
                        options={patients}
                        value={formik.values.patient}
                        onChange={formik.handleChange}/>
                    <Input
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}/>
                    <Input
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}/>
                    <SelectInput
                        label="Contact"
                        name="contact"
                        selected={formik.values.phoneCode}
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        onSelectChange={(value) => formik.setFieldValue("phoneCode", value)}
                        options={countries.map(e => ({...e, value: e.phonecode}))}/>
                    <Datepicker
                        label="Select Date"
                        value={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date.target.value)}/>
                    <TextArea
                        className="col-span-2"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}/>
                    {formik.values?.doctor?.uid && date && (
                        <div className="col-span-2">
                            <p className="mb-0.5 text-sm">Slot Available</p>
                            <div className="w-full grid grid-cols-6 gap-4">
                                {slots.length === 0 && (
                                    <p className="h-11 w-full border-1 border-gray-300 rounded-xl">No slot available</p>
                                )}
                                {slots.map((e, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={`h-11 rounded-xl text-sm
                                                ${formik.values.slot === e ? 'bg-primary-300 text-white border-0' : 'border-2 border-gray-300'}`}
                                        onClick={() => formik.setFieldValue('slot', e)}>
                                        {e.start} - {e.end}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 text-right">
                    <button
                        type="submit"
                        className="h-10 px-10 mt-6 rounded-xl bg-primary text-white text-sm">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    )
}