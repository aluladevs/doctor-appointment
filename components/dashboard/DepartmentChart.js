import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

export default function DepartmentChart() {
    return (
        <div>
            <h2 className="text-xl mb-3">Patient by Department</h2>
            <Doughnut
                data={data}
                height={150}
            />
        </div>
    );
}