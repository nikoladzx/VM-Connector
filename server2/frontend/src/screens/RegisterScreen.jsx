import { useState } from "react";
import { Form, Button} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import RegistrationSuccess from "../components/RegistrationSuccess";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const dispatch = useDispatch();

  useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.1.3:3333/api/login",
        {
          name,
          password,
        },
        {
          withCredentials :true
        }
      );

      const { data } = response;
      console.log(data);

      dispatch(setCredentials({ ...data }));

      setRegistrationSuccessful(true);

      // navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  return (
    <FormContainer>
      {registrationSuccessful ? (
        <RegistrationSuccess />
      ) : (
        <>
          <h1>Login</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Šifra</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite šifru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Uloguj se
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};
export default RegisterScreen;
