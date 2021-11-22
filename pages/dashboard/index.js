import MainLayout from "../../components/MainLayout";
import PatientIcon from "../../assets/patient.svg";
import DoctorIcon from "../../assets/doctor.svg";
import StaffIcon from "../../assets/staff.svg";
import ReportIcon from "../../assets/report.svg";
import {useState} from "react";
import {TimeFilter} from "../../constants/filter";
import Widget from "../../components/dashboard/Widget";
import Card from "../../components/Card";
import AppointmentChart from "../../components/dashboard/AppointmentChart";
import GenderChart from "../../components/dashboard/GenderChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";

export default function Dashboard() {
    const [filter, setFilter] = useState({
        patient: TimeFilter[0]
    });

    const handleChangeFilter = (name, value) => {
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const WidgetData = [
        {
            title: "Patient",
            content: 43,
            name: "patient",
            label: filter.patient.name,
            icon: PatientIcon,
            color: "primary"
        },
        {
            title: "Doctors",
            content: 43,
            name: "doctor",
            label: filter.patient.name,
            icon: DoctorIcon,
            color: "warning"
        },
        {
            title: "Staff",
            content: 43,
            name: "staff",
            label: filter.patient.name,
            icon: StaffIcon,
            color: "success"
        },
        {
            title: "Report",
            content: 43,
            name: "report",
            label: filter.patient.name,
            icon: ReportIcon,
            color: "error"
        },
    ];

    return (
        <MainLayout
            title="Good Morning, Putri"
            subtitle="Welcome back, hope you are doing well.">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    {WidgetData.map((item, i) => (
                        <Widget
                            key={i}
                            title={item.title}
                            content={item.content}
                            label={item.label}
                            icon={item.icon}
                            color={item.color}
                            onChange={(val) => handleChangeFilter(item.name, val)}/>
                    ))}
                </div>
                <Card className="w-full">
                    <GenderChart/>
                </Card>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Card className="w-full">
                        <AppointmentChart/>
                    </Card>
                </div>
                <Card className="w-full">
                    <DepartmentChart/>
                </Card>
            </div>
        </MainLayout>
    )
}