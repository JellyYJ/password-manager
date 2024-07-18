import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Table.css";
import { deletePassword, getPasswords, updatePassword } from "../api/api";
import Row from "./Row";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  // State variables for editing
  const [editingIndex, setEditingIndex] = useState(-1);
  const [edited, setEdited] = useState("");

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

  const handleUpdate = async (index, passwordData) => {
    try {
      const { id, ...updatedData } = passwordData;
      const response = await updatePassword(id, updatedData);
      if (response.status === 200) {
        const updatedPasswordsList = [...passwordsList];
        updatedPasswordsList[index] = {
          ...updatedPasswordsList[index],
          ...updatedData,
        };
        setPasswordsList(updatedPasswordsList);
        setEditingIndex(-1); // Reset editing state after update
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update password: ", error);
      toast.error("Failed to update password!");
    }
  };

  const onEdit = (index) => {
    setEditingIndex(index);
    setEdited(passwordsList[index]);
  };

  const handleDelete = async (id) => {
    try {
      await deletePassword(id);
      const updatedPasswordsList = passwordsList.filter(
        (password) => password.id !== id
      );
      setPasswordsList(updatedPasswordsList);
      toast.success("Password deleted successfully!");
    } catch (error) {
      console.error("Failed to delete password: ", error);
      toast.error("Failed to delete password!");
    }
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
          onEdit={onEdit}
          handleDelete={handleDelete}
          edited={edited}
          setEdited={setEdited}
        />
      ))}
      <ToastContainer />
    </div>
  );
}
export default Table;
