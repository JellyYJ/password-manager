import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Table.css";
import { getPasswords } from "../api/api";
import Row from "./Row";

function Table() {
  const [passwordsList, setPasswordsList] = useState([]);

  useEffect(() => {
    async function fetchPasswords() {
      try {
        const response = await getPasswords();
        console.log(response);
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
          password={password}
          handleCopy={handleCopy}
          index={index}
          toggleShowPassword={toggleShowPassword}
        />
      ))}
      <ToastContainer />
    </div>
  );
}

export default Table;
