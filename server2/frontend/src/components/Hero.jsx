import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import TestScreen from "../screens/TestScreen";

const Hero = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  return (
    <div className="d-flex py-5 justify-content-center">
      <div className="d-flex">
        {adminInfo ? (
          <TestScreen />
        ) : (
          <>
            <Container className="d-flex justify-content-center">
              <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4">Morate biti ulogovani </h1>
                <p className="text-center mb-4">
                  Molimo Vas, kliknite na dugme ispod kako biste se ulogovali
                </p>
                <Button variant="primary" href="/login">
                  Login
                </Button>
              </Card>
            </Container>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
