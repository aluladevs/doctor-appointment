import MainLayout from "../../components/MainLayout";
import Calendar from "../../components/Calendar";
import Card from "../../components/Card";
import {useState} from "react";
import moment from "moment";
import {XIcon} from "@heroicons/react/outline";
import TimePicker from "../../components/TimePicker";
import Modal from "../../components/Modal";

export default function Appointment() {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

    const [slotModal, setSlotModal] = useState(false);

    const changeDate = (date) => {
        setSelectedDate(date);
    }

    return (
        <MainLayout title="Appointment">
            <Card>
                <div className="grid grid-cols-3 gap-4">
                    <Calendar
                        className="col-span-2"
                        cellLabel="appointment"
                        selectedDate={selectedDate}
                        onClick={changeDate}/>
                    <div className="mx-4 my-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-600">Appointment</h3>
                            <p className="font-semibold">{moment(selectedDate).format("DD MMM YYYY")}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                className="h-10 w-full mb-4 col-span-2 bg-primary rounded-xl text-sm text-white"
                                onClick={() => setSlotModal(true)}>Add Slot</button>
                        </div>
                    </div>
                </div>

                <Modal open={slotModal} title="Add New Appointment" onClose={() => setSlotModal(false)}>

                    <div className="text-right">
                        <button
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