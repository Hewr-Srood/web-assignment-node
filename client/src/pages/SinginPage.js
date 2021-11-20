import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router";

function SigninPage() {
  const navigate = useNavigate();

  const handleForm = (username, password) => {
    axios
      .post("http://localhost:4000/users/signin", { username, password })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        localStorage.setItem("id", data._id);
        navigate("/tasks");
      })
      .catch(() => {
        window.alert("Check your credential");
      });
  };
  return <Form handleForm={handleForm} />;
}

export default SigninPage;
