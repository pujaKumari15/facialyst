import { Accordion, Table } from '@mantine/core';

export function DepartmentAnalysis() {

  return (
    <Accordion radius="xl" defaultValue="Apples">
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
                   A {/* <Avatar size={40} src={element.url} radius={26} /> */}
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