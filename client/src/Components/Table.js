import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Table.css";
import { getPasswords, updatePassword } from "../api/api";
import Row from "./Row";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  // State variables for editing
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedCredential, setEditedCredential] = useState("");

  useEffect(() => {
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

    fetchPasswords();
  }, []);

  const toggleShowPassword = (index) => {
    const updatedPasswordsList = [...passwordsList];
    updatedPasswordsList[index].showPassword =
      !updatedPasswordsList[index].showPassword;
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

  const handleUpdate = async (index, updatedFields) => {
    try {
      const { id, ...updatedData } = updatedFields;
      await updatePassword(id, updatedData);
      const updatedPasswordsList = [...passwordsList];
      updatedPasswordsList[index] = {
        ...updatedPasswordsList[index],
        ...updatedData,
      };
      setPasswordsList(updatedPasswordsList);
      setEditingIndex(-1); // Reset editing state after update
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Failed to update password: ", error);
      toast.error("Failed to update password!");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedCredential(passwordsList[index]);
  };

  if (passwordsList.length === 0) return null;

  return (
    <div className="table-container">
      <div className="header">
        <span>Website</span>
        <span>Username</span>
        <span>Password</span>
      </div>

      {passwordsList.map((password, index) => (
        <Row
          key={password.id}
          password={password}
          handleCopy={handleCopy}
          index={index}
          toggleShowPassword={toggleShowPassword}
          handleUpdate={handleUpdate}
          isEditing={index === editingIndex}
          handleEdit={handleEdit}
        />
      ))}
      <ToastContainer />
    </div>
  );
}
export default Table;
