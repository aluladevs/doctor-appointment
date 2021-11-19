import React from 'react';
import {Line, Bar} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Upcoming',
            fill: true,
            lineTension: 0.4,
            backgroundColor: 'rgba(0,113,255,0.3)',
            borderColor: 'rgba(0,113,255,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Completed',
            fill: true,
            lineTension: 0.4,
            backgroundColor: 'rgba(38,192,149,0.3)',
            borderColor: 'rgba(38,192,149,1)',
            data: [23, 59, 43, 81, 66, 89, 40]
        }
    ],
};

export default function AppointmentChart() {
    return (
        <div>
            <h2 className="text-xl mb-3">Appointments</h2>
            <Line
                data={data}
                height={150}/>
        </div>
    );
}