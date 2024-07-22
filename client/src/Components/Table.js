import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Table.css";
import { deletePassword, getPasswords, updatePassword } from "../api/api";
import Row from "./Row";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  async function fetchPasswords() {
    try {
      const response = await getPasswords();
      if (response) {
        const passwordsWithData = response.map((password) => ({
          ...password,
          showPassword: false,
        }));
        setPasswordsList(passwordsWithData);
      }
    } catch (error) {
      console.error("Error retrieving passwords: ", error);
    }
  }

  useEffect(() => {
    fetchPasswords();
  }, []);

  const toggleShowPassword = (id) => {
    const updatedPasswordsList = passwordsList.map((password) =>
      password.id === id
        ? { ...password, showPassword: !password.showPassword }
        : password
    );
    setPasswordsList(updatedPasswordsList);
  };

  const handleCopy = async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch (error) {
      console.error(`Failed to copy ${text}: `, error);
      toast.error(`Failed to copy ${text}!`);
    }
  };

  const handleUpdate = async (id, updatedPassword) => {
    try {
      const response = await updatePassword(id, updatedPassword);
      if (response.status === 200) {
        toast.success("Password updated successfully!");
      }
      fetchPasswords();
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePassword(id);
      fetchPasswords();
      toast.success("Password deleted successfully!");
    } catch (error) {
      console.error("Failed to delete password: ", error);
      toast.error("Failed to delete password!");
    }
  };

  if (!passwordsList || passwordsList.length === 0) return null;

  return (
    <div className="table-container">
      <div className="header">
        <span>Website</span>
        <span>Username</span>
        <span>Password</span>
        <span>Actions</span>
      </div>

      {passwordsList.map((password) => (
        <Row
          key={password.id}
          password={password}
          handleCopy={handleCopy}
          toggleShowPassword={toggleShowPassword}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
      <ToastContainer />
    </div>
  );
}
export default Table;
