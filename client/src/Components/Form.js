import { useState } from "react";
import "./Form.css";
import { addPassword } from "../api/api";

function Form() {
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    website: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await addPassword(formData);
    if (result && result.data === "Success") {
      console.log("Password saved successfully");
      clearInput();
    } else {
      console.error("Failed to save password");
    }
  }

  function clearInput() {
    setFormData({
      password: "",
      username: "",
      website: "",
    });
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>SAVE Password</h3>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        value={formData.username}
        required
      />
      <input
        type="text"
        placeholder="Website (e.g., example.com)"
        name="website"
        onChange={handleChange}
        value={formData.website}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default Form;
