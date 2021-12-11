import Head from 'next/head';
import Image from "next/image";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Select from "../components/Select";
import Datepicker from "../components/Datepicker";

import Banner from "../assets/frontpage-illustration.svg";
import SelectInput from "../components/SelectInput";
import TextArea from "../components/TextArea";
import countries from "../constants/countries";
import {useFormik} from "formik";
import {AvailableService} from "../services";
import {groupedByDate} from "../lib/manipulation";
import * as yup from "yup";

export default function Home(props) {
  const { doctors, appointments } = props;
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

    },
    validationSchema: validationSchema,
    onSubmit: values => {

    }
  });

  useEffect(() => {
    if (formik.values.doctor && formik.values.date) {
      const uid = formik.values.doctor.uid;

      AvailableService.GetAvailableByDoctorDate(uid, formik.values.date)
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
  }, [formik.values.doctor, formik.values.date]);

  return (
      <Layout>
        <Head>
          <title>Enkindle - Doctors Appointment</title>
          <meta name="description" content="Enkindle - Doctors Appointment" />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <div className="flex justify-between items-center">
          <div className="w-1/2 pl-20 pr-10">
            <h1 className="text-5xl font-bold leading-normal">Find Your Doctors and Make Appointment</h1>
            <p className="mt-2 text-sm">Make appointment with your doctor in our clinic. Set the date you choose and get your diagnose.</p>
            <button className="py-3 px-8 bg-primary rounded-2xl text-white text-sm mt-5">
              Make Appointment Now
            </button>
          </div>
          <Image src={Banner} height={700}/>
        </div>

        <div className="w-3/4 mx-auto mt-10">
          <h1 className="mb-14 text-5xl text-center">Make Appointment Now</h1>
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <Select
                  useSearch
                  label="Select Doctors"
                  name="doctor"
                  options={doctors}
                  value={formik.values.doctor}
                  onChange={formik.handleChange}/>
            </div>
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
            {formik.values?.doctor?.uid && formik.values.date && (
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

          <button className="py-2.5 px-6 float-right bg-primary rounded-xl text-white text-sm mt-6">
            Make Appointment
          </button>
        </div>
      </Layout>
  )
}

export async function getServerSideProps(ctx) {
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/doctor`);
  let data = await response.json();

  const appointmentResponse = await fetch(`${dev ? DEV_URL : PROD_URL}/api/appointment`);
  const appointmentData = await appointmentResponse.json();

  return {
    props: {
      doctors: data.data,
      appointments: groupedByDate(appointmentData.data)
    },
  };
}