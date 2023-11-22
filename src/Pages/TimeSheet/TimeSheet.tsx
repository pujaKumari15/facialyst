import { useEffect, useState } from "react"
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

import _ from "lodash"
import { Accordion, Avatar, Badge, Table, Text } from "@mantine/core";

export const TimeSheet = () => {

    const [mergedData, setMergedData] = useState<any>({})


    useEffect(() => {
        fetchAllEmployeesAttendance()
    }, [])


    const fetchAllEmployeesAttendance = async () => {
        const requestURL =
            "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
            new URLSearchParams({
                objectKey: ``,
                action: 'getAllEmployees',
            });

        const empData = await fetch(requestURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })

        console.log(empData)

        const requestURL2 =
            "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
            new URLSearchParams({
                objectKey: ``,
                action: 'getAllEmployeesAttendance',
            });

        const attendanceData = await fetch(requestURL2, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })

        console.log(attendanceData)

        const nameURLMap: any = {}

        empData.data.forEach((emp: any) => {
            const firstName: string = emp.firstName
            nameURLMap[`${firstName}`] = emp.url
        })

        const mergeData = attendanceData.data.map((eachData: any) => {
            return {
                ...eachData,
                url: nameURLMap[`${eachData.firstName}`],
                timeStrWithOutTime: dayjs.unix(parseFloat(eachData.time)).tz(dayjs.tz.guess()).format('LL')
            }
        })

        const groupedData = _.groupBy(mergeData, function (n) {
            return n.timeStrWithOutTime;
        });



        setMergedData(groupedData)
        console.log(groupedData)


    }



    const items = Object.keys(mergedData).map((eachData: string) => {

        const rows = mergedData[eachData].sort((a:string,b:string)=>b.time-a.time).map((element: any) => (
            <Table.Tr key={element.uuid}>
                <Table.Td>
                    <Avatar size={40} src={element.url} radius={26} />
                </Table.Td>
                <Table.Td>{element.firstName} {element.lastName}</Table.Td>
                <Table.Td>
                    {element.action==='checkIn'?
                    <Badge
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'lime', to: 'green', deg: 90 }}
                    >
                        {element.action}
                    </Badge>:<Badge
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'red', to: 'pink', deg: 90 }}
                    >
                        {element.action}
                    </Badge>}
                </Table.Td>
                <Table.Td>{dayjs.unix(parseFloat(element.time)).tz(dayjs.tz.guess()).format('LLL')}</Table.Td>
            </Table.Tr>
        ));

        return (
            <Accordion.Item key={eachData} value={eachData}>
                <Accordion.Control icon={"📅"}>
                    <Text fw={500}>{eachData}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Employee</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Action</Table.Th>
                                <Table.Th>Time</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Accordion.Panel>
            </Accordion.Item>
        )
    })




    return (
        <Accordion chevronPosition="left" variant="separated" multiple defaultValue={[...Object.keys(mergedData)]}>
            {items}
        </Accordion>

    )
}