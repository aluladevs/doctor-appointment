import Modal from "../../Modal";
import moment from "moment";

export default function DetailModal(props) {
    const { open, data, onClose, onCancel } = props;

    return (
        <Modal
            className="w-full lg:w-1/2"
            open={open} title="Detail Appointment"
            onClose={onClose}>
            <div>
                <div className="mb-8 text-center">
                    <h4 className="mb-1.5 text-xl font-semibold">{moment(data?.date).format("DD MMM YYYY")}</h4>
                    <h5>Time: <span className="font-medium">{data?.slot?.start} - {data?.slot?.end}</span></h5>
                </div>
                <h4 className="font-semibold">Doctor Information</h4>
                <table className="w-full">
                    <tr>
                        <td className="w-1/3">Doctor Name</td>
                        <td className="w-10">:</td>
                        <td>{data?.doctor?.name}</td>
                    </tr>
                    <tr>
                        <td className="w-1/3">Contact</td>
                        <td className="w-10">:</td>
                        <td>{data?.doctor?.phoneCode.phonecode}{data?.doctor?.contact}</td>
                    </tr>
                </table>

                <h4 className="mt-8 font-semibold">Patient Information</h4>
                <table className="w-full">
                    <tr>
                        <td className="w-1/3">Patient Name</td>
                        <td className="w-10">:</td>
                        <td>{data?.name}</td>
                    </tr>
                    <tr>
                        <td className="w-1/3">Email</td>
                        <td className="w-10">:</td>
                        <td>{data?.name}</td>
                    </tr>
                    <tr>
                        <td className="w-1/3">Contact</td>
                        <td className="w-10">:</td>
                        <td>{data?.phoneCode.phonecode}{data?.contact}</td>
                    </tr>
                </table>

                {moment().isBefore(data?.date) && (
                    <div className="mt-10 text-right">
                        <button className="h-11 px-6 text-sm text-white bg-red-600 rounded-xl" onClick={onCancel}>
                            Cancel Appointment
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    )
}