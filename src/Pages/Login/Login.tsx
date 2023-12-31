import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button, Image } from "@mantine/core";
import { useState, useEffect } from "react";
import UserPool from "../../UserPool";
import { CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { PinInput } from "@mantine/core";
import { toast } from "react-toastify";
import useAuthData from "../../zustandStore/useAuthData";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const setCognitoUserAttribute = (attributeKey: string, attributeValue: string) => {
  const data = {
    Name: attributeKey,
    Value: attributeValue,
  };

  return new CognitoUserAttribute(data);
};

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthData();
  const [cookies, setCookie] = useCookies(["user"]);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [enableVerify, setEnableVerfiy] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  useEffect(() => {
    if (cookies.user?.id) {
      setUser(cookies.user, true);
      navigate("/dashboard");
    }
  }, [cookies]);

  const signUpOnSubmit = (event: any) => {
    event.preventDefault();
    setSignUpLoading(true);
    // const attributeList = [];

    // attributeList.push(setCognitoUserAttribute("name", fname + " " + lname));
    // attributeList.push(setCognitoUserAttribute("custom:first_name", fname));
    // attributeList.push(setCognitoUserAttribute("custom:last_name", lname));
    // attributeList.push(setCognitoUserAttribute("custom:role", "user"));

    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error(err);
        toast.error(
          <Text fw={"700"} c={"#e74c3c"}>
            Something went wrong
          </Text>
        );
      } else {
        setEnableVerfiy(true);
        toast.info(
          <Text fw={"700"} c={"#3498db"}>
            Check your email for verification code
          </Text>
        );
        console.log(data);
      }
      setSignUpLoading(false);
    });
  };

  const loginOnSubmit = (event: any) => {
    event.preventDefault();
    setLogInLoading(true);

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess", data);

        const payloadData = data.getIdToken().decodePayload();

        const emailVerified = payloadData.email_verified;
        const user = {
          email: payloadData.email,
          name: payloadData.name,
          id: payloadData.sub,
          firstName: payloadData["custom:first_name"],
          lastName: payloadData["custom:last_name"],
          role: payloadData["custom:role"],
        };

        const d = new Date();
        d.setTime(d.getTime() + 120 * 60 * 1000);

        setUser(user, true);
        setCookie("user", user, {
          expires: d,
        });
        setLogInLoading(false);
        navigate("/dashboard");
      },
      onFailure: (err) => {
        console.log("onFailure", err);
        toast.error(
          <Text fw={"700"} c={"#e74c3c"}>
            User not found!
          </Text>
        );
        setLogInLoading(false);

      },
    });
  };

  const verifyOnSubmit = (event: any) => {
    setVerifyLoading(true);
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(code, true, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        toast.success(
          <>
            <Text fw={"700"} c={"green"}>
              Account Verified
            </Text>
          </>
        );
        setCode("");
        setVerifyLoading(false);
        loginOnSubmit(event);
      }
    });
  };

  return (
    <Container size={420} my={40}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <img width="60" height="60" src="https://img.icons8.com/ultraviolet/40/facial-recognition-scan.png" alt="facial-recognition-scan" />
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          Facialyst
        </Text>
      </div>
      {/* {isSignUpClicked ? (
        <>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                setIsSignUpClicked(false);
              }}
            >
              Log in
            </Anchor>
          </Text>
        </>
      ) : (
        <>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                setIsSignUpClicked(true);
              }}
            >
              Create account
            </Anchor>
          </Text>
        </>
      )} */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {isSignUpClicked ? (
          <>
            {enableVerify ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Text mt="md" fw={500} ta="center">
                  Enter verification code
                </Text>
                <PinInput
                  length={6}
                  type="number"
                  mt="md"
                  value={code}
                  onChange={(e) => {
                    setCode(e);
                  }}
                />

                <Button fullWidth mt="xl" onClick={verifyOnSubmit} loading={verifyLoading}>
                  Verify
                </Button>
              </div>
            ) : (
              <>
                <TextInput label="First Name" placeholder="dave" mt="md" required value={fname} onChange={(e) => setfName(e.target.value)} />
                <TextInput label="Last Name" placeholder="brooks" mt="md" required value={lname} onChange={(e) => setlName(e.target.value)} />
                <TextInput
                  label="Email"
                  placeholder="you@mantine.dev"
                  required
                  mt="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  mt="md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth mt="xl" onClick={signUpOnSubmit} loading={signUpLoading}>
                  Sign up
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <TextInput label="Email" placeholder="you@mantine.dev" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth mt="xl" onClick={loginOnSubmit} loading={logInLoading}>
              Log in
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}