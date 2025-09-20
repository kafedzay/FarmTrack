import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
// Ghana phone number: +233XXXXXXXXX or 0XXXXXXXXX (9 digits after prefix)
const GH_PHONE_REGEX = /^(\+233|0)[0-9]{9}$/;
// Strong password: min 8 chars, uppercase, lowercase, number, special char
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const AuthPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [detected, setDetected] = useState("unknown");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function detectType(value) {
    if (EMAIL_REGEX.test(value)) return "email";
    return "unknown";
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setDetected(detectType(value));
    setError("");
  }

  function validateForm() {
    if (isLogin) {
      if (!email.trim()) return "Email is required.";
      if (!EMAIL_REGEX.test(email)) return "Please enter a valid email.";
      if (!password.trim()) return "Password is required.";
      return null;
    } else {
      if (!firstname.trim() || firstname.length < 3)
        return "Firstname must be at least 3 characters.";
      if (!lastname.trim() || lastname.length < 3)
        return "Lastname must be at least 3 characters.";
      if (!email.trim() || !EMAIL_REGEX.test(email))
        return "Valid email is required.";
      if (!PASSWORD_REGEX.test(password))
        return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      if (phone && !GH_PHONE_REGEX.test(phone))
        return "Phone must be a valid Ghanaian number.";
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let payload = {};
      let endpoint = "";

      if (isLogin) {
        endpoint = "https://farmtrack-api.onrender.com/api/auth/login";
        payload = { email, password };
      } else {
        endpoint = "https://farmtrack-api.onrender.com/api/auth/register";
        payload = {
          firstname,
          lastname,
          email,
          phone: phone || undefined, // only send if provided
          password,
        };
      }

      console.log("📤 Sending payload:", payload);

      const res = await axios.post(endpoint, payload);

      setMessage(res.data.message || "Success!");

      // ✅ Navigate after 2s
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";
      setError(errorMsg);
      setMessage("");
      setLoading(false);
    }
  }

  // ✅ Loading spinner
  if (loading) {
    return (
      <section className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 border-4 border-[#b58900] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute w-7 h-7 border-4 border-[#b58900] border-b-transparent rounded-full animate-spin-slow"></div>
        </div>
        <p className="mt-4 text-[#b58900] font-semibold text-lg animate-pulse">
          Processing...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#fdfcf9] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#b58900] mb-6">
          {isLogin ? "Login to FarmTrack" : "Register for FarmTrack"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                placeholder="Phone (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </>
          )}

          {/* Email */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full border ${
                error && detected === "unknown"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md px-4 py-2`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {detected === "email" && (
                <MdEmail className="text-2xl text-green-400" />
              )}
              {detected === "unknown" && email && (
                <BsFillQuestionOctagonFill className="text-red-400 text-2xl" />
              )}
            </div>
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#b58900] text-white px-4 py-2 rounded-md hover:bg-[#a57800] transition-colors"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
              setFirstname("");
              setLastname("");
              setPhone("");
              setEmail("");
              setPassword("");
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
