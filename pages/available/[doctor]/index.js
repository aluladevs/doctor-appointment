import MainLayout from "../../../components/MainLayout";
import Card from "../../../components/Card";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AvailableService, DoctorService} from "../../../services";
import Calendar from "../../../components/Calendar";
import moment from "moment";
import {groupedByDate} from "../../../lib/date";
import TimePicker from "../../../components/TimePicker";
import Modal from "../../../components/Modal";
import {XIcon} from "@heroicons/react/outline";

export default function Detail() {
    const router = useRouter();
    const { doctor } = router.query;

    const [doctorInfo, setDoctorInfo] = useState({});
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [availableCount, setAvailableCount] = useState({});
    const [selectedAvailable, setSelectedAvailable] = useState([]);

    const [slotModal, setSlotModal] = useState(false);
    const [tempSlot, setTempSlot] = useState({ start: "00:00", end: "00:00" });

    useEffect(() => {
        if (doctor) {
            fetchAllAvailable();

            DoctorService.GetDoctorByUid(doctor)
                .then(res => {
                    setDoctorInfo(res.data);
                })
        }
    }, [doctor]);

    useEffect(() => {
        fetchAvailableByDate(selectedDate);
    }, [selectedDate]);

    const fetchAllAvailable = () => {
        AvailableService.GetAvailableByDoctor(doctor)
            .then(res => {
                const result = res.data.data;

                const group = groupedByDate(result);
                Object.keys(group).forEach(key => {
                    return group[key] = group[key].map(e => e.slots?.length ?? 0);
                });

                setAvailableCount(group);
            })
    }

    const fetchAvailableByDate = (date) => {
        if (doctor) {
            AvailableService.GetAvailableByDoctorDate(doctor, date)
                .then(res => {
                    setSelectedAvailable(res.data);
                });
        }
    }

    const changeDate = (value) => {
        setSelectedDate(value);
    }

    const changeSlot = ({target}) => {
        setTempSlot({
            ...tempSlot,
            [target.name]: target.value
        });
    };

    const addSlots = () => {
        if (tempSlot.start && tempSlot.end) {
            const slots = [
                ... selectedAvailable?.slots ? selectedAvailable.slots : [],
                {
                    start: tempSlot.start,
                    end: tempSlot.end
                }
            ]
            const params = {
                doctor: doctor._id,
                date: selectedDate,
                slots: slots
            };

            if (selectedAvailable._id) {
                AvailableService.UpdateAvailable(doctor, selectedDate, params)
                    .then(res => {
                        if (res.data.success) {
                            fetchAvailableByDate(selectedDate);

                            setAvailableCount({
                                ...availableCount,
                                [selectedDate]: availableCount[selectedDate] + 1
                            });

                            setSlotModal(false);
                            setTempSlot({ start: "00:00", end: "00:00" });
                        }
                    });
            } else {
                AvailableService.CreateAvailable(params)
                    .then(res => {
                        if (res.data.success) {
                            fetchAvailableByDate(selectedDate);

                            setAvailableCount({
                                ...availableCount,
                                [selectedDate]: 1
                            });

                            setSlotModal(false);
                            setTempSlot({ start: "00:00", end: "00:00" });
                        }
                    });
            }
        }
    };

    const removeSlot = (id) => {
        const params = {
            ...selectedAvailable,
            slots: selectedAvailable.slots.filter(e => e._id !== id)
        };

        AvailableService.UpdateAvailable(doctor, selectedDate, params)
            .then(res => {
                if (res.data.success) {
                    fetchAvailableByDate(selectedDate);

                    setAvailableCount({
                        ...availableCount,
                        [selectedDate]: availableCount[selectedDate] - 1
                    });

                    setSlotModal(false);
                    setTempSlot({ start: "00:00", end: "00:00" });
                }
            });
    }

    return (
        <MainLayout>
            <Card>
                <div className="flex gap-6 items-center">
                    <h1 className="text-2xl font-medium">{doctorInfo?.name ?? ''}</h1>
                    <div className="my-4 flex flex-wrap gap-4">
                        {doctorInfo?.specialization?.map((item, j) => (
                            <span key={j} className="py-1 px-3 text-sm text-primary text-xs font-semibold rounded-xl bg-gray-50">{item.name}</span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Calendar
                        className="col-span-2"
                        cellLabel="slots"
                        selectedDate={selectedDate}
                        onClick={(value) => changeDate(value)}
                        data={availableCount}/>
                    <div className="mx-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-600">Available Slots</h3>
                            <p className="font-semibold">{moment(selectedDate).format("DD MMM YYYY")}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                className="h-10 w-full mb-4 col-span-2 bg-primary rounded-xl text-sm text-white"
                                onClick={() => setSlotModal(true)}>Add Slot</button>
                            {selectedAvailable?.slots?.map((e, i) => (
                                <div key={i} className="my-4 flex">
                                    <button className="h-12 w-full border-2 border-gray-300 rounded-xl text-sm">
                                        {e.start} - {e.end}
                                    </button>
                                    <button className="h-12 w-6 ml-4" onClick={() => removeSlot(e._id)}>
                                        <XIcon className="h-5 w-5 text-gray-400"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal open={slotModal} title="Add New Slot" onClose={() => setSlotModal(false)}>
                    <div className="flex items-end gap-4">
                        <TimePicker
                            label="Start at"
                            name="start"
                            value={tempSlot.start}
                            onChange={changeSlot}/>
                        <h1 className="px-5 mt-4">-</h1>
                        <TimePicker
                            label="End at"
                            name="end"
                            value={tempSlot.end}
                            onChange={changeSlot}/>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={addSlots}
                            type="button"
                            className="h-10 px-5 mt-6 rounded-xl bg-primary text-white text-sm">
                            Add
                        </button>
                    </div>
                </Modal>
            </Card>
        </MainLayout>
    )
}