// import React, { useState } from "react";

// const LoginSection = ({ onLogin }) => {
//     const [form, setForm] = useState({ username: "", password: "" });
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//         setError("");
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Dummy authentication logic
//         if (form.username === "farmer" && form.password === "farm123") {
//             onLogin && onLogin(form.username);
//         } else {
//             setError("Invalid username or password.");
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.title}>FarmTrack Login</h2>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={handleChange}
//                     style={styles.input}
//                     autoComplete="username"
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     style={styles.input}
//                     autoComplete="current-password"
//                 />
//                 {error && <div style={styles.error}>{error}</div>}
//                 <button type="submit" style={styles.button}>
//                     Log In
//                 </button>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         maxWidth: 350,
//         margin: "80px auto",
//         padding: 32,
//         borderRadius: 12,
//         background: "#f7fafc",
//         boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//         textAlign: "center",
//     },
//     title: {
//         marginBottom: 24,
//         color: "#2d6a4f",
//         fontWeight: 700,
//         letterSpacing: 1,
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         gap: 16,
//     },
//     input: {
//         padding: 10,
//         borderRadius: 6,
//         border: "1px solid #b7e4c7",
//         fontSize: 16,
//     },
//     button: {
//         padding: "10px 0",
//         borderRadius: 6,
//         border: "none",
//         background: "#40916c",
//         color: "#fff",
//         fontWeight: 600,
//         fontSize: 16,
//         cursor: "pointer",
//         marginTop: 8,
//     },
//     error: {
//         color: "#d90429",
//         fontSize: 14,
//         marginBottom: 4,
//     },
// };

// export default LoginSection;



import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="bg-[#fdfcf9] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#b58900] mb-6">
          {isLogin ? 'Login to FarmTrack' : 'Register for FarmTrack'}
        </h2>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
          />
          <button
            type="submit"
            className="w-full bg-[#b58900] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#a57800] transition-colors duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#b58900] font-semibold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
