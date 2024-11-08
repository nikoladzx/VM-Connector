import ListVMs from '../components/GetVMs';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
axios.defaults.withCredentials = true;
const TestScreen = () => {
  const { adminInfo } = useSelector((state) => state.auth);

  return (
    <div className="d-flex py-5 justify-content-center">
      <div className="d-flex">
        {adminInfo ? (
          <ListVMs />
        ) : (
          <>
            <Container className="d-flex justify-content-center">
              <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4">Morate biti registrovani </h1>
                <p className="text-center mb-4">
                  Ukoliko vidite ovu poruku, kontaktirajte asistenta kako bi Vam
                  omogućio pristup
                </p>
                <Button variant="primary" href="/register">
                  Registracija
                </Button>
              </Card>
            </Container>
          </>
        )}
      </div>
    </div>
  );
};

export default TestScreen;
