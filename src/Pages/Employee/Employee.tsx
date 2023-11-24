import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Paper,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Header } from "../../Components/Header";
import Webcam from "react-webcam";
import {
  IconBulb,
  IconBulbOff,
  IconDoorEnter,
  IconDoorExit,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import cx from "clsx";
import classes from "./Employee.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

async function dataURItoBlob(dataURI: any) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}

interface Props {
 showNavbar: boolean
}

export const Employee = ({showNavbar=true}:Props) => {
  dayjs.extend(localizedFormat);
  const webcamRef: any = useRef(null);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [time, setTime] = useState("");
  const [showWebcam, setShowWebcam] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkOutSelected, setCheckOutSelected] = useState(false)
  const [litime, setLitime] = useState("");


  const [image, setImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  async function authenticate(visitorImageName: string, action: string) {
    const requestURL =
      "https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/employee?" +
      new URLSearchParams({
        objectKey: `${visitorImageName}.jpeg`,
        action,
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
        return data;
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("dddd,MMMM DD,YYYY HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!showWebcam) {
      setTimeout(() => {
        setShowWebcam(true)
        setCheckOutSelected(false)
      }, 5000)
    }
  }, [showWebcam])


  const capture = useCallback(async (action: string) => {
    setLoading(true)
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImage(imageSrc);
    setLitime(dayjs().format("HH:mm:ss"));
    const visitorImageName = uuidv4();
    const file = await dataURItoBlob(imageSrc);
    fetch(
      `https://jknhddpe08.execute-api.us-east-2.amazonaws.com/dev/visitor.images.store/${visitorImageName}.jpeg`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: file,
      }
    )
      .then(async () => {
        const response = await authenticate(visitorImageName, action);
        if (response.Message === "Success") {
          console.log(response["firstName"], response["lastName"]);
          setFname(response["firstName"]);
          setLname(response["lastName"]);
          setValidUser(true);
        } else {
          console.log("Person not found");
          setValidUser(false);
        }
        setShowWebcam(false);
        setLoading(false)

      })
      .catch((error: any) => {
        setLoading(false)
        console.log(error);
      });
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      {showNavbar&&<Header />}
      <Container size={"sm"}>
        <Text ta={"center"} p={"15px"} size="xl" fw={"900"}>
          {time}
        </Text>
        <Group justify="center">
          {showWebcam ?
            <Paper shadow="xl" radius="xl" withBorder p="lg">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="light"
                  color="red"
                  radius="md"
                  leftSection={<IconDoorEnter size={18} />}
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    setCheckOutSelected(true)
                    capture('checkOut')
                  }}
                >
                  Check out
                </Button>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  height={400}
                  screenshotFormat="image/jpeg"
                  width={400}
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
                  rightSection={<IconDoorExit size={18} />}
                  style={{ fontSize: "20px" }}
                  onClick={() => { capture('checkIn') }}
                  loading={loading}
                >
                  Check In
                </Button>
              </div>
            </Paper> : <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <img src={image}></img>
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                {validUser ?
                  <div style={{
                    display: "flex", flexDirection: "column", width: "100%",

                  }}> <Badge fullWidth color="green" variant="light" size="xl">
                      {checkOutSelected ? `See You ${fname} ${lname}` : `Welcome ${fname} ${lname}`}
                    </Badge> <Text>{checkOutSelected ? 'Logged Out Successfully !' : 'Logged in Successfully !'}<br />Time : {litime}</Text></div> : <Badge fullWidth color="red" variant="light" size="xl">
                    User not found, Please contact Administator
                  </Badge>
                }

              </Group>
            </Card>}

        </Group>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "15px",
          }}
        >
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            <IconBulb
              className={cx(classes.icon, classes.light)}
              stroke={1.5}
            />
            <IconBulbOff
              className={cx(classes.icon, classes.dark)}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      </Container>
    </>
  );
};
