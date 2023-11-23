import { Button, Container, Group, Input, Paper, SimpleGrid, Text } from "@mantine/core";
import { FilesList } from "../../Components/FilesList";
import { UploadComponent } from "../../Components/UploadComponent";
import { useEffect, useRef, useState } from "react";
// import { getFilesList } from "../../services/api";
import useAuthData from "../../zustandStore/useAuthData";
import { IconScan, IconUpload, IconX } from "@tabler/icons-react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { FileWithPath } from "@mantine/dropzone";

async function dataURItoBlob(dataURI: any) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}

export function EmployeeRegistration() {
  const { user } = useAuthData();
  const webcamRef: any = useRef(null);


  const [filesList, setFilesList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [fileAdded, setFileAdded] = useState(false)
  const [file,setFile] = useState<Blob>();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")



  const fileUploadedSignal = async () => {

    const requestURL =
      "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
      new URLSearchParams({
        objectKey: ``,
        action: 'getAllEmployees',
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

  const capture = async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    const file = await dataURItoBlob(imageSrc);
    setFile(file)
    setFileAdded(true)

   

  }

  const processUpload = async ()=>{
    await fetch(
      `https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee.images.store/${firstName}_${lastName}.jpeg`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: file,
      }
    )


    toast.success(
      <Text fw={"700"} c={"green"}>
        Face Recognize Complete
      </Text>
    );

    setFileAdded(false)




    setTimeout(async () => {
      await fileUploadedSignal();
    }, 3000)
  }

  useEffect(() => {
    fileUploadedSignal();
  }, []);

  return (
    <>
      <Container>
        <SimpleGrid cols={1}>
          <div>
            <SimpleGrid cols={2}>
              <UploadComponent fileUploadedSignal={fileUploadedSignal} />
              <Paper shadow="xl" radius="xl" withBorder p="lg">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {!fileAdded?
                  <>
                    <Webcam
                      audio={false}
                      height={400}
                      screenshotFormat="image/jpeg"
                      width={400}
                      ref={webcamRef}
                      videoConstraints={{
                        width: 400,
                        height: 350,
                        facingMode: "user",
                      }}
                    />
                    <Button
                      variant="light"
                      color="green"
                      radius="md"
                      rightSection={<IconScan size={18} />}
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                          capture()
                      }}
                    >
                      Scan
                    </Button>
                  </>:<Group justify="center" gap="xl" mih={220}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text size="lg" fw={500} ta={"center"} mb={'10px'}>
                      Add Name
                    </Text>
                    <Group>
                      <Input placeholder="First Name" value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                      }} />
                      <Input placeholder="Last Name" value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                      }} />
                    </Group>
                    <div>
                      <Button m={"10px"} fw={700} size="md" variant="light" color="blue" rightSection={<IconUpload size={14} />} onClick={() => { processUpload() }}>
                        Upload
                      </Button>
                      <Button
                        m={"10px"}
                        fw={700}
                        size="md"
                        variant="light"
                        color="red"
                        rightSection={<IconX size={14} />}
                        onClick={() => {
                            setFileAdded(false)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Group>}
                </div>

              </Paper>
            </SimpleGrid>
          </div>
          <div>
            <FilesList list={filesList ?? []} listLoading={listLoading} setListLoading={setListLoading} fileUploadedSignal={fileUploadedSignal} />
          </div>
        </SimpleGrid>
      </Container>
    </>
  );
}