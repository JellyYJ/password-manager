import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ".././Table.css";
import { deletePassword, getPasswords, updatePassword } from "../../api/api";
import Row from "./Row_v0";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  // State variables for editing
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

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
        setEditingId(null);
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update password: ", error);
      toast.error("Failed to update password!");
    }
  };

  const onEdit = (index) => {
    const password = passwordsList[index];
    setEditingId(password.id);
    setEditData(password);
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

  if (!passwordsList || passwordsList.length === 0) return null;

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
          index={index}
          handleCopy={handleCopy}
          toggleShowPassword={toggleShowPassword}
          handleUpdate={handleUpdate}
          isEditing={password.id === editingId}
          onEdit={onEdit}
          editData={editData}
          setEditData={setEditData}
          handleDelete={handleDelete}
        />
      ))}
      <ToastContainer />
    </div>
  );
}
export default Table;
