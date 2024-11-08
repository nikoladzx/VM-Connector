import { useState, useEffect } from 'react';
import axios from 'axios';
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '48px 16px',
  },
  formWrapper: {
    maxWidth: '480px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#4b5563',
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
  },
  successAlert: {
    backgroundColor: '#d1fae5',
    border: '1px solid #a7f3d0',
    color: '#047857',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed',
  },
  footer: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#4b5563',
  },
};

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    ipAddress: '',
    roomNumber: '',
    deskNumber: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:3333/api/rooms');
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to fetch rooms');
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword || 
        !formData.ipAddress || !formData.roomNumber || !formData.deskNumber) {
      setError('All fields are required');
      return false;
    }
  
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
  
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
  
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipPattern.test(formData.ipAddress)) {
        setError('Please enter a valid IP address');
        return false;
      }
  
      return true;
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess(false);

      if (!validateForm()) return;

      setLoading(true);

      try {
        console.log(formData.deskNumber);
        console.log(formData.roomNumber)
        const response = await axios.post("http://192.168.1.3:3333/api/create", {
          username: formData.username,
          password: formData.password,
          ipAddress: formData.ipAddress,
          roomNumber: formData.roomNumber,
          deskNumber: formData.deskNumber
        });

        setSuccess(true);
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          ipAddress: '',
          roomNumber: '',
          deskNumber: ''
        });
        
        console.log('VM created:', response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while creating the VM');
        console.error('Error creating VM:', err);
      } finally {
        setLoading(false);
      }
    };
  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create New VM</h2>
          <p style={styles.subtitle}>
            Fill in the details below to create a new VM
          </p>
        </div>

        {error && (
          <div style={{...styles.alert, ...styles.errorAlert}}>
            {error}
          </div>
        )}

        {success && (
          <div style={{...styles.alert, ...styles.successAlert}}>
            Virtual Machine created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter username"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter password"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm password"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="ipAddress" style={styles.label}>
              IP Address
            </label>
            <input
              id="ipAddress"
              name="ipAddress"
              type="text"
              required
              value={formData.ipAddress}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g., 192.168.1.100"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="roomNumber" style={styles.label}>
              Room
            </label>
            <select
              id="roomNumber"
              name="roomNumber"
              required
              value={formData.roomNumber}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.identifier} value={room.identifier}>
                  {room.identifier}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="deskNumber" style={styles.label}>
              Desk Number
            </label>
            <select
              id="deskNumber"
              name="deskNumber"
              required
              value={formData.deskNumber}
              onChange={handleChange}
              style={styles.input}
              disabled={!formData.roomNumber}
            >
              <option value="">Select a desk</option>
              {formData.roomNumber && rooms.find(room => room.identifier === formData.roomNumber)?.roomNumbers.map((deskNumber) => (
                <option key={deskNumber} value={deskNumber}>
                  {deskNumber}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Creating...' : 'Create VM'}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            All fields are required. Password must be at least 8 characters long.
          </p>
        </div>
      </div>
    </div>
  );
}