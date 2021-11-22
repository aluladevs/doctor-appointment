import Card from "../Card";
import SmallSelect from "../SmallSelect";
import {TimeFilter} from "../../constants/filter";
import Image from "next/image";
import PatientIcon from "../../assets/patient.svg";

export default function Widget(props) {
    const { title, label, color, icon, onChange, content } = props;

    return (
        <Card className="w-full">
            <div className="flex justify-between items-center text-sm">
                <p className="text-xl">{title}</p>
                <SmallSelect
                    name="patient"
                    label={label}
                    options={TimeFilter}
                    onChange={onChange}/>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className={`p-3 bg-${color ?? "primary"}-light rounded-3xl flex items-center`}>
                    <Image className="text-primary" src={icon} width={40} height={40}/>
                </div>
                <h1 className="text-4xl font-semibold">{content}</h1>
            </div>
        </Card>
    )
}