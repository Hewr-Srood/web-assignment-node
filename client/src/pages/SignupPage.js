import { useState, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router";

function SignupPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  useEffect(() => {}, [success]);
  const handleForm = (username, password) => {
    axios
      .post("http://localhost:4000/users/signup", { username, password })
      .then((res) => {
        setSuccess(true);
        const { data } = res.data;
        localStorage.setItem("id", data._id);
        navigate("/tasks");
      })
      .catch((e) => {
        window.alert(e);
      });
  };
  return <Form isSignUp handleForm={handleForm} />;
}

export default SignupPage;
