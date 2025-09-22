import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [detected, setDetected] = useState("unknown");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Detect whether input is email or phone
  function detectType(value) {
    if (EMAIL_REGEX.test(value)) return "email";
    if (GH_PHONE_REGEX.test(value)) return "phone";
    return "unknown";
  }

  function handleEmailOrPhoneChange(e) {
    const value = e.target.value;
    setEmailOrPhone(value);
    setDetected(detectType(value));
    setError("");
  }

  function normalizePhone(phone) {
    // Convert local 0XXXXXXXXX → +233XXXXXXXXX
    if (/^0[0-9]{9}$/.test(phone)) {
      return "+233" + phone.slice(1);
    }
    return phone;
  }

  function validateForm() {
    if (isLogin) {
      if (!emailOrPhone.trim()) return "Email or phone is required.";

      // Accept either email or Ghana phone number
      if (
        !EMAIL_REGEX.test(emailOrPhone) &&
        !GH_PHONE_REGEX.test(emailOrPhone)
      ) {
        return "Please enter a valid email or Ghanaian phone number.";
      }

      if (!password.trim()) return "Password is required.";
      return null;
    } else {
      // Registration validation
      if (!firstname.trim() || firstname.length < 3)
        return "Firstname must be at least 3 characters.";
      if (!lastname.trim() || lastname.length < 3)
        return "Lastname must be at least 3 characters.";
      if (!emailOrPhone.trim() || !EMAIL_REGEX.test(emailOrPhone))
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
        endpoint = "http://localhost:5500/api/auth/login";
        payload = {
          emailOrPhone:
            detected === "phone" ? normalizePhone(emailOrPhone) : emailOrPhone,
          password,
        };
        // payload = { emailOrPhone: emailOrPhone.trim(), password };
      } else {
        endpoint = "https://farmtrack-api.onrender.com/api/auth/register";
        payload = {
          firstname,
          lastname,
          email: emailOrPhone, // treat as email in register
          phone: phone ? normalizePhone(phone) : undefined, // only send if provided
          password,
        };
      }

      console.log("Sending payload:", payload);

      const res = await axios.post(endpoint, payload);

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log(res.data);
      setMessage(res.data.message || "Success!");

      //Navigate after 2s
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

  //  Loading spinner
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
          {/* registration  */}
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </>
          )}

          {/* Email or Phone login*/}
          <div className="relative">
            <input
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              placeholder={isLogin ? "Email or Phone" : "Email"}
              value={emailOrPhone}
              onChange={handleEmailOrPhoneChange}
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
              {detected === "phone" && (
                <BsFillTelephoneFill className="text-2xl text-blue-400" />
              )}
              {detected === "unknown" && emailOrPhone && (
                <BsFillQuestionOctagonFill className="text-red-400 text-2xl" />
              )}
            </div>
          </div>

          {/* password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500"
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-2xl" />
              ) : (
                <AiFillEye className="text-2xl" />
              )}
            </button>
          </div>

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
              setEmailOrPhone("");
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
