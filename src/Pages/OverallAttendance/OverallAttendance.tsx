import {
    Chart as ChartJS, ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, Legend
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { Container, Grid, Paper } from "@mantine/core";
import { faker } from '@faker-js/faker';
import { StatsGrid } from "../../Components/StatsGrid";
import { StatsRing } from "../../Components/StatsRing";

export const pieChartData = {
    labels: ['Present', 'WFH', 'Absent'],
    datasets: [
        {
            label: 'employees',
            data: [10578, 4735, 2550],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        },
    ],
};

export const OverallAttendance = () => {

    ChartJS.register(ArcElement, CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Stats',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Present',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Absent',
                data: labels.map(() => faker.datatype.number({ min: 100, max: 200 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return <>
        <Grid >
            <Grid.Col span={8} >
                <Paper shadow="xl" radius="sm" withBorder p="xl" h={"100%"}>
                    <Line options={options} data={data} />
                </Paper>
            </Grid.Col>
            <Grid.Col span={4}>
                <Paper shadow="xl" radius="sm" withBorder p="xl" h={"100%"}>
                    <Pie data={pieChartData} height={"50%"} width={"50%"} />
                </Paper>
            </Grid.Col>
        </Grid>
        <StatsRing/>
        <StatsGrid />
    </>



}

