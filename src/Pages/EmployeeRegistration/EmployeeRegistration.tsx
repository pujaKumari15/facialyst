import { Container, SimpleGrid } from "@mantine/core";
import { FilesList } from "../../Components/FilesList";
import { UploadComponent } from "../../Components/UploadComponent";
import { useEffect, useState } from "react";
// import { getFilesList } from "../../services/api";
import useAuthData from "../../zustandStore/useAuthData";

export function EmployeeRegistration() {
  const { user } = useAuthData();

  const [filesList, setFilesList] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const fileUploadedSignal = async () => {

    const requestURL =
    "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
    new URLSearchParams({
      objectKey: ``,
      action:'getAllEmployees',
    });

    await fetch(requestURL, {
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
            setFilesList(data.data)
            console.log(data)
        })
        .catch((error) => console.error(error));

    // setListLoading(true);
    // const fileList = await getFilesList(user.id);
    // setFilesList(fileList);
    // setListLoading(false);
  };

  useEffect(() => {
    fileUploadedSignal();
  }, []);

  return (
    <>
      <Container>
        <SimpleGrid cols={1}>
          <div>
            <UploadComponent fileUploadedSignal={fileUploadedSignal} />
          </div>
          <div>
            <FilesList list={filesList??[]} listLoading={listLoading} setListLoading={setListLoading} fileUploadedSignal={fileUploadedSignal} />
          </div>
        </SimpleGrid>
      </Container>
    </>
  );
}