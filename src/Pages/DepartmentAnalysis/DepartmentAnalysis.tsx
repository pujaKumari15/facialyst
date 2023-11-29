import { faker } from '@faker-js/faker';
import { Accordion, Avatar, Button, Table,Text } from '@mantine/core';

export function DepartmentAnalysis() {

    return (
        <>
            <Accordion variant="separated" radius="sm" defaultValue="y">
                <Accordion.Item key="x" value="y">
                    <Accordion.Control ><Text fw={'bold'}>Technical</Text></Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Employee</Table.Th>
                                    <Table.Th>Employee-id</Table.Th>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Attendance</Table.Th>
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    [1, 2, 3, 4].map((each) => {
                                        return (
                                            <Table.Tr key={faker.string.uuid()}>
                                                <Table.Td>
                                                    <Avatar size={40} radius={26} src={faker.image.avatarLegacy()} />
                                                </Table.Td>
                                                <Table.Td>{faker.string.numeric(5)}</Table.Td>
                                                <Table.Td>{faker.person.fullName()}</Table.Td>
                                                <Table.Td>
                                                    {faker.number.int({min:0,max:5})}/5
                                                </Table.Td>
                                                <Table.Td><Button>Notify Manager</Button></Table.Td>
                                            </Table.Tr>
                                        )
                                    })
                                }

                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Accordion variant="separated" radius="sm">
                <Accordion.Item key="x" value="y">
                    <Accordion.Control ><Text fw={'bold'}>Marketing</Text></Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                <Table.Th>Employee</Table.Th>
                                    <Table.Th>Employee-id</Table.Th>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Attendance</Table.Th>
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                            {
                                    [1, 2].map((each) => {
                                        return (
                                            <Table.Tr key={faker.string.uuid()}>
                                                <Table.Td>
                                                    <Avatar size={40} radius={26} src={faker.image.avatarLegacy()} />
                                                </Table.Td>
                                                <Table.Td>{faker.string.numeric(5)}</Table.Td>
                                                <Table.Td>{faker.person.fullName()}</Table.Td>
                                                <Table.Td>
                                                    {faker.number.int({min:0,max:5})}/5
                                                </Table.Td>
                                                <Table.Td><Button>Notify Manager</Button></Table.Td>
                                            </Table.Tr>
                                        )
                                    })
                                }
                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Accordion variant="separated" radius="sm">
                <Accordion.Item key="x" value="y">
                    <Accordion.Control ><Text fw={'bold'}>Finance</Text></Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                <Table.Th>Employee</Table.Th>
                                    <Table.Th>Employee-id</Table.Th>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Attendance</Table.Th>
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                            {
                                    [1, 2, 3, 4,6,7,8].map((each) => {
                                        return (
                                            <Table.Tr key={faker.string.uuid()}>
                                                <Table.Td>
                                                    <Avatar size={40} radius={26} src={faker.image.avatarLegacy()} />
                                                </Table.Td>
                                                <Table.Td>{faker.string.numeric(5)}</Table.Td>
                                                <Table.Td>{faker.person.fullName()}</Table.Td>
                                                <Table.Td>
                                                    {faker.number.int({min:0,max:5})}/5
                                                </Table.Td>
                                                <Table.Td><Button>Notify Manager</Button></Table.Td>
                                            </Table.Tr>
                                        )
                                    })
                                }
                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Accordion variant="separated" radius="sm">
                <Accordion.Item key="x" value="y">

                    <Accordion.Control ><Text fw={'bold'}>Human Resource</Text></Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                <Table.Th>Employee</Table.Th>
                                    <Table.Th>Employee-id</Table.Th>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Attendance</Table.Th>
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                            {
                                    [1, 2, 3, 4].map((each) => {
                                        return (
                                            <Table.Tr key={faker.string.uuid()}>
                                                <Table.Td>
                                                    <Avatar size={40} radius={26} src={faker.image.avatarLegacy()} />
                                                </Table.Td>
                                                <Table.Td>{faker.string.numeric(5)}</Table.Td>
                                                <Table.Td>{faker.person.fullName()}</Table.Td>
                                                <Table.Td>
                                                    {faker.number.int({min:0,max:5})}/5
                                                </Table.Td>
                                                <Table.Td><Button>Notify Manager</Button></Table.Td>
                                            </Table.Tr>
                                        )
                                    })
                                }
                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>);
}