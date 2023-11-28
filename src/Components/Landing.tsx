import { Overlay, Container, Title, Button, Text, Group } from '@mantine/core';
import { useNavigate } from 'react-router';
import classes from './Landing.module.css';

export function Landing() {

    const navigate = useNavigate();  
    const onStarted = () => {
        navigate("/navbar")
  }  

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={0.5}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Facialyst , An AWS Powered Facial Attandance System</Title>
        <Text className={classes.description} size="xl" mt="xl">
        The state-of-the-art facial recognition on the cloud to deliver a 99.9% accurate and automated 
        attendance tracking experience. Elevate your workforce management with 
        Facialyst, where precision meets efficiency, handling thousands of faces seamlessly.
        </Text>

        <Group justify = "center">
        <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }} size="xl" radius="sm" className={classes.control} onClick={onStarted}>
          Entry Scan
        </Button>
        <Button variant="gradient"  gradient={{ from: 'teal', to: 'green', deg: 90 }} size="xl" radius="sm" className={classes.control} onClick={onStarted}>
          Login as Administator
        </Button>
        </Group>
      </Container>
    </div>
  );
}