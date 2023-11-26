import {
  Button,
  Center,
  Container,
  FileButton,
  Group,
  Input,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { FilesList } from "../../Components/FilesList";
import { UploadComponent } from "../../Components/UploadComponent";
import { useEffect, useRef, useState } from "react";
// import { getFilesList } from "../../services/api";
import useAuthData from "../../zustandStore/useAuthData";
import { IconScan, IconUpload, IconX } from "@tabler/icons-react";
import classes from "./EmployeeRegistration.module.css";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { FileWithPath } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);

  const [filesList, setFilesList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [dept,setDept] = useState('')
  const [fileAdded, setFileAdded] = useState(false);
  const [file, setFile] = useState<Blob | File | null>();
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enableSubmit,setEnableSubmit] = useState(true)

  const fileUploadedSignal = async () => {
    const requestURL =
      "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
      new URLSearchParams({
        objectKey: ``,
        action: "getAllEmployees",
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
        setFilesList(data.data);
        setFirstName("")
        setLastName("")
        setDept("")
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
    setFile(file);
    setFileAdded(true);
  };

  const processUpload = async () => {

    console.log(firstName,lastName)

    await fetch(
      `https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee.images.store/${firstName.trim()}_${lastName.trim()}.jpeg`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: file,
      }
    );

    toast.success(
      <Text fw={"700"} c={"green"}>
        Face Recognize Complete
      </Text>
    );

    setFileAdded(false);

    setTimeout(async () => {
      await fileUploadedSignal();
    }, 3000);
  };
  const processFileUpload = async () => {
    try {
      await fetch(
        `https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee.images.store/${firstName}_${lastName}.jpeg`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
          },
          body: fileUpload,
        }
      );
      toast.success(
        <Text fw={"700"} c={"green"}>
          Face Recognize Complete
        </Text>
      );
      setTimeout(async () => {
        await fileUploadedSignal();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fileUploadedSignal();
  }, []);

  useEffect(() => {

    if(file || fileUpload){
      setEnableSubmit(false)
    }

  }, [file,fileUpload]);

  return (
    <>
      <Container>
        <div>
          <Paper shadow="xl" p="xl">
            <Text fw={700} size="xl">
              Register a New Employee
            </Text>
            <TextInput
              label="First Name"
              placeholder="Enter the Employee's First name"
              classNames={classes}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <br />
            <TextInput
              label="Last Name"
              placeholder="Enter the Employee's Last name"
              classNames={classes}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <Select
              mt="md"
              comboboxProps={{ withinPortal: true }}
              data={["Tech", "Marketing", "Finance", "HR"]}
              
              defaultChecked
              placeholder="Select the Employee's Department"
              label="Department"
              classNames={classes}
              value={dept}
              onChange={(e)=>{
                setDept(e??" ")
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <FileButton
                  onChange={(file) => {
                    setFileUpload(file);
                    toast.success(
                      <Text fw={"700"} c={"green"}>
                         File Uploaded
                      </Text>
                  );
                  }}
                  accept="image/jpeg"
                >
                  {(props) => <Button {...props} 
                  fw={700}
                  size="md"
                  variant="filled">Upload Photo</Button>}
                </FileButton>

                <Button
                  m={"10px"}
                  fw={700}
                  size="md"
                  variant="filled"
                  color="orange"
                  onClick={()=>{
                    open()
                  }}
                >
                  Use Camera
                </Button>
              </div>
              <div>
                <Button
                  m={"10px"}
                  fw={700}
                  size="md"
                  variant="filled"
                  color="green"
                  disabled={enableSubmit}
                  onClick={()=>{
                    if (fileUpload){
                      processFileUpload()
                    }else{
                      processUpload()
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Paper>
        </div>
        <br />
        <SimpleGrid cols={1}>
          <div>
            <Paper shadow="xl" p="xl">
              <Text fw={700} size="xl">
                List of Employees
              </Text>
              <FilesList
                list={filesList ?? []}
                listLoading={listLoading}
                setListLoading={setListLoading}
                fileUploadedSignal={fileUploadedSignal}
              />
            </Paper>
          </div>
        </SimpleGrid>
      </Container>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered 
      
      overlayProps={{
        backgroundOpacity: 0.75,
        blur: 3,
      }}
      >
      <div style={{display:'flex', flexDirection:'column'}}>
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
                          capture();
                          close()
                        }}
                      >
                        Scan
                      </Button>
                    </div>
      </Modal>
    </>
  );
}
