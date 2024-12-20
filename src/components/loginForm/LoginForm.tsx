
// import React, { useState } from 'react';
// import Button from '../buttons/Button';


// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior
    
//     // Check if email and password are not empty
//     if (email.trim() === '' || password.trim() === '') {
//       setError('Email and password are required');
//       return;
//     }

//     setLoading(true); // Start loading state

//     try {
//       const response = await fetch('http://localhost:4000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to login');
//       }

//     const data = await response.json();
//     const { accessToken } = data;
//     const {id} = data;
//     const {role} = data ;

//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('id', id);
//     localStorage.setItem('role', role);
   
//     console.log("token is ",accessToken);
//     console.log("id is ",id);
//     console.log("role is ",role);

    
// ///commandesIn
//     switch (role) {
//       case 'admin':
//         window.location.href = 'comptes/';
//         break;
//       case 'agentserviceachat':
//         window.location.href = 'commandes/';
//         break;
//       case 'magasinier':
//         window.location.href = 'commandesIn/';
//         break;
//       case 'structureresponsable':
//         window.location.href = 'commandesIn/';
//         break;
//       case 'director':
//         window.location.href = 'commandesIn/';
//         break;
//       case 'consumer':
//         window.location.href = 'commandesIn/';
//         break;
//       default:
//         console.error('Invalid role');
//     }
  
  
//       // console.log('Login successful:', data); window.location.href = 'commandes/';
  

    
//       setEmail('');
//       setPassword('');
//       setError(null);
//     } catch (error) {
//       setError((error as Error).message || 'Failed to login');
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         {/* Email input */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Email"
//             style={{ fontSize: '0.9em' }}
//           />
//         </div>
//         {/* Password input */}
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
//             Mot de passe
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Mot de passe"
//             style={{ fontSize: '0.9em' }}
//           />
//         </div>
//         {/* Login button */}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Loading...' : 'Log In'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;




import React, { useState, useEffect } from 'react';
import Button from '../buttons/Button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // User is already logged in, redirect them based on their role
      const role = localStorage.getItem('role');
      redirectBasedOnRole(role);
    }
  }, []);

  const accessToken = localStorage.getItem('accessToken');

  const redirectBasedOnRole = (role: string | null) => {
    if (role && accessToken) {
      switch (role) {
        case ('admin' && accessToken):
          window.location.href = 'comptes/';
          break;
        case ('agentserviceachat'&& accessToken):
          window.location.href = 'commandes/';
          break;
        case ('magasinier' && accessToken):
        case ('structureresponsable'&& accessToken):
        case ('director'&& accessToken):
        case ('consumer'&& accessToken):
          window.location.href = 'commandesIn/';
          break;
        default:
          console.error('Invalid role');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      setError('Email and password are required');
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      const { accessToken, id, role } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('id', id);
      localStorage.setItem('role', role);

      redirectBasedOnRole(role);

      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      setError((error as Error).message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            style={{ fontSize: '0.9em' }}
          />
        </div>
        {/* Password input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mot de passe"
            style={{ fontSize: '0.9em' }}
          />
        </div>
        {/* Login button */}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
