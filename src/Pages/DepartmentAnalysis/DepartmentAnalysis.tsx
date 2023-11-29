import { Accordion, Avatar, Table } from '@mantine/core';

export function DepartmentAnalysis() {

  return (
    <Accordion variant="separated" radius = "sm">
      <Accordion.Item key="x" value="y">
      <Accordion.Control >Tech</Accordion.Control>
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
                        <Table.Tbody>
                        <Table.Tr key="x">
                <Table.Td>
                   <Avatar size={40}  radius={26} /> 
                </Table.Td>
                <Table.Td>B</Table.Td>
                <Table.Td>
                    C
                </Table.Td>
                <Table.Td>D</Table.Td>
            </Table.Tr>
                        </Table.Tbody>
                    </Table>
      </Accordion.Panel>
      <Accordion.Control >Marketing</Accordion.Control>
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
                        <Table.Tbody>
                        <Table.Tr key="x">
                <Table.Td>
                   <Avatar size={40}  radius={26} /> 
                </Table.Td>
                <Table.Td>B</Table.Td>
                <Table.Td>
                    C
                </Table.Td>
                <Table.Td>D</Table.Td>
            </Table.Tr>
                        </Table.Tbody>
                    </Table>
      </Accordion.Panel>
      <Accordion.Control >Finance</Accordion.Control>
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
                        <Table.Tbody>
                        <Table.Tr key="x">
                <Table.Td>
                   <Avatar size={40}  radius={26} /> 
                </Table.Td>
                <Table.Td>B</Table.Td>
                <Table.Td>
                    C
                </Table.Td>
                <Table.Td>D</Table.Td>
            </Table.Tr>
                        </Table.Tbody>
                    </Table>
      </Accordion.Panel>
      <Accordion.Control >HR</Accordion.Control>
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
                        <Table.Tbody>
                        <Table.Tr key="x">
                <Table.Td>
                   <Avatar size={40}  radius={26} /> 
                </Table.Td>
                <Table.Td>B</Table.Td>
                <Table.Td>
                    C
                </Table.Td>
                <Table.Td>D</Table.Td>
            </Table.Tr>
                        </Table.Tbody>
                    </Table>
      </Accordion.Panel>
    </Accordion.Item>
    </Accordion>
    
  );
}