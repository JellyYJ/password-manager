import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Row.css";

export default function Row({
  password,
  handleCopy,
  toggleShowPassword,
  handleUpdate,
  handleDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(password.id, editData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderEditForm = () => {
    if (isEditing) {
      return (
        <>
          <input
            type="text"
            name="website"
            value={editData.website}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            value={editData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            value={editData.password}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="button" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <span>{password.website}</span>
        <span
          className="username"
          onClick={() =>
            handleCopy(password.username, "Username copied to clipboard!")
          }
        >
          {password.username}
        </span>
        <span
          className="password"
          onClick={() =>
            handleCopy(password.password, "Password copied to clipboard!")
          }
        >
          {password.showPassword ? (
            password.password
          ) : (
            <span className="password">••••••••</span>
          )}
        </span>
        <div className="actions">
          <button onClick={() => toggleShowPassword(password.id)}>
            {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => handleDelete(password.id)}>Delete</button>
        </div>
      </>
    );
  };

  return <div className="row">{renderEditForm()}</div>;
}
