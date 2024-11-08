import { useEffect, useState } from 'react';
import axios from 'axios';
import './VMList.css';

const ListVMs = () => {
  const [vms, setVms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:3333/api/vms');
        console.log(response.data);
        setVms(response.data);
        
        // Initialize all passwords as hidden
        const passwordState = response.data.reduce((acc, _, index) => {
          acc[index] = false;
          return acc;
        }, {});
        setVisiblePasswords(passwordState);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCreateVM = () => {
    window.location.href = 'http://192.168.1.3:3232/createvms';
  };

  const maskPassword = (password) => {
    return '•'.repeat(password.length);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="vm-list-container">
      <h1>Virtual Machines</h1>
      <div className="table-container">
        <table className="vm-table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Classroom - PC</th>
            </tr>
          </thead>
          <tbody>
            {vms.map((vm, index) => (
              <tr key={index}>
                <td>{vm.lastName}</td>
                <td>{vm.firstName}</td>
                <td className="password-cell">
                  <span className="password-text">
                    {visiblePasswords[index]
                      ? vm.attributes.showpw
                      : maskPassword(vm.attributes.showpw)}
                  </span>
                  <button
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility(index)}
                  >
                    {visiblePasswords[index] ? 'Hide' : 'Show'}
                  </button>
                </td>
                <td>{`${vm.attributes.roomNumber} - Desk ${vm.attributes.deskNumber}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="create-vm-container">
        <button className="create-vm-btn" onClick={handleCreateVM}>
          Create New VM
        </button>
      </div>
    </div>
  );
};

export default ListVMs;