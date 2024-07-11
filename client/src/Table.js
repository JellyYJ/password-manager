import React, { useEffect, useState } from "react";
import "./Table.css";
import { getPasswords } from "./api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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

  const handleCopyUsername = async (username) => {
    try {
      await navigator.clipboard.writeText(username);
      alert("Username copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy username: ", error);
    }
  };

  const handleCopyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy password: ", error);
    }
  };

  if (passwordsList.length === 0) return;

  return (
    <div className="table-container">
      <div className="header">Website</div>
      <div className="header">Username</div>
      <div className="header">Password</div>

      {passwordsList.map((password, index) => (
        <React.Fragment key={index}>
          <div>{password.website}</div>
          <div
            className="username"
            onClick={() => handleCopyUsername(password.username)}
          >
            {password.username}
          </div>
          <div className="password">
            {password.showPassword ? (
              <span onClick={() => handleCopyPassword(password.password)}>
                {password.password}
              </span>
            ) : (
              <span>••••••••</span>
            )}
            <button onClick={() => toggleShowPassword(index)}>
              {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Table;
