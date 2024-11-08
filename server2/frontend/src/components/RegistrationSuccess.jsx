
import axios from 'axios';

axios.defaults.withCredentials = true;


const RegistrationSuccess = () => {
  

  return (
    <div>
      <h2>Uspešan login</h2>
      {/* ... Your other content ... */}
      <p>
        Uspesno ste se ulogovali, kliknite na ovaj link kako biste videli dodate virtuelne masine <a href="/">ovde</a>{" "}
      </p>
    </div>
  );
};

export default RegistrationSuccess;
