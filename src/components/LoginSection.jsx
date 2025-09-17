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



import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

// ✅ Simple validation regex
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{6,20}$/; // loose phone validation

const AuthPage = () => {
  // Local state for the form
  const [isLogin, setIsLogin] = useState(true);      // toggle login/register
  const [identifier, setIdentifier] = useState("");  // email or phone input
  const [password, setPassword] = useState("");      // password input
  const [detected, setDetected] = useState("unknown"); // "email" | "phone" | "unknown"
  const [error, setError] = useState("");            // error messages
  const [message, setMessage] = useState("");        // success messages

  /**
   * Detect whether user input is an email or phone.
   */
  function detectType(value) {
    if (EMAIL_REGEX.test(value)) return "email";
    const digits = value.replace(/\D/g, "");
    if (PHONE_REGEX.test(value) && digits.length >= 7 && digits.length <= 15) {
      return "phone";
    }
    return "unknown";
  }

  /**
   * Handle typing in the identifier field.
   */
  function handleIdentifierChange(e) {
    const value = e.target.value;
    setIdentifier(value);
    setDetected(detectType(value));
    setError(""); // clear error on typing
  }

  /**
   * Handle form submission (login/register).
   * This sends data to your backend API.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    const type = detectType(identifier);
    if (type === "unknown") {
      setError("Please enter a valid email or phone number.");
      return;
    }

    try {
      // 👇 Call backend API (adjust URL if deployed)
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          identifierType: type,
          password,
          isLogin,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage(data.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  }

  return (
    <section className="bg-[#fdfcf9] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#b58900] mb-6">
          {isLogin ? "Login to FarmTrack" : "Register for FarmTrack"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Show name field only during register */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          )}

          {/* Identifier input (email or phone) */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={handleIdentifierChange}
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2`}
            />

            {/* Detection badge (email / phone / ?) */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {detected === "email" && <MdEmail className="text-2xl text-green-400" />}
              {detected === "phone" && <FaSquarePhoneFlip className="text-2xl text-green-400" />}
              {detected === "unknown" && <BsFillQuestionOctagonFill className="text-red-400 text-2xl" />}
            </div>
          </div>

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />

          {/* Show error/success messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#b58900] text-white px-4 py-2 rounded-md hover:bg-[#a57800] transition-colors"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle login/register link */}
        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
            }}
            className="text-[#b58900] font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
