import { ActionIcon, Avatar, Button, Group, Modal, Skeleton, Table, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// import { deleteEntry } from "../../services/api";
import { useEffect, useState } from "react";
// import fileDownload from "js-file-download";
import { UploadComponent } from "./UploadComponent";
// import axios from "axios";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);


interface Props {
    setListLoading: React.Dispatch<React.SetStateAction<boolean>>;
    listLoading: boolean;
    list: {
        rekognitionid: string;
        firstName: string;
        lastName: string;
        fileKey: string;
        url: string;
        registeredAt: string,
    }[];
    fileUploadedSignal: () => void;
}

export function FilesList({ list = [], fileUploadedSignal, listLoading, setListLoading }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteLoading, setDeleteLoading] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    const processDelete = async () => {
        try {

            const requestURL =
                "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
                new URLSearchParams({
                    objectKey: selectedFile,
                    action: 'removeEmployee',
                });

            return await fetch(requestURL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    toast.success(
                        <Text fw={"700"} c={"green"}>
                            File Deleted
                        </Text>
                    );
                    fileUploadedSignal();
                    close()
                    return data;
                })
                .catch((error) => console.error(error));


        } catch (error) {
            throw error;
        }
    };




    const rows = list!.map((element) => (
        <Table.Tr key={element.rekognitionid}>
            <Table.Td>
                <Skeleton visible={listLoading}>
                    <Avatar size={40} src={element.url} radius={26} />
                </Skeleton>
            </Table.Td>
            <Table.Td>
                <Skeleton visible={listLoading}><Text size={'md'} fw={500}>{element.firstName}</Text></Skeleton>
            </Table.Td>
            <Table.Td>
                <Skeleton visible={listLoading}><Text size={'md'} fw={500}>{element.lastName}</Text></Skeleton>
            </Table.Td>
            <Table.Td>
                <Skeleton visible={listLoading}>
                    <Text size={'md'} fw={500}>
                        {dayjs.unix(parseFloat(element.registeredAt)).tz(dayjs.tz.guess()).format('LLL')}
                    </Text>
                </Skeleton>
            </Table.Td>
            <Table.Td>
                <Skeleton visible={listLoading}>
                    <ActionIcon variant="outline" color="red" size="md" aria-label="Settings" onClick={() => {
                        setSelectedFile(element.rekognitionid)
                        open()
                    }}>
                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Skeleton>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>First Name</Table.Th>
                        <Table.Th>Last Name</Table.Th>
                        <Table.Th>Registered At</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {list.length > 0 && <Table.Tbody>{rows}</Table.Tbody>}
            </Table>
            {list.length === 0 && (
                <>
                    <Skeleton height={30} mt={6} radius="sm" />
                    <Skeleton height={30} mt={6} radius="sm" />
                </>
            )}
            <Modal opened={opened} onClose={close} title={<Text fw={600}>Confirm Delete User</Text>} centered>
                <Group grow>
                    <Button variant="filled" color="green" onClick={() => { processDelete() }}>Yes</Button>
                    <Button variant="filled" color="red" onClick={() => { close() }}>No</Button>
                </Group>
            </Modal>
        </>
    );
}