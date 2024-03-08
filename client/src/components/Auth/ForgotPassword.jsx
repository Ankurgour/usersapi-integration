// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     newPassword: '',
//   });

//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:4000/forgot-password', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message);

//         // Delay the navigation to the login page after 3 seconds
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.message);
//       }
//     } catch (error) {
//       console.error('Error during password reset:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="text" name="email" value={formData.email} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Username:
//           <input type="text" name="username" value={formData.username} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           New Password:
//           <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
//         </label>
//         <br />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/forgot-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);

        // Delay the navigation to the login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
        </label>
        <br />
        <label style={styles.label}>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} />
        </label>
        <br />
        <label style={styles.label}>
          New Password:
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} style={styles.input} />
        </label>
        <br />
        <button type="submit" style={styles.button}>Reset Password</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f4f4f4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    margin: '5px 0',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  message: {
    color: 'green',
    marginTop: '10px',
  },
};

export default ForgotPassword;
