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
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData(password);
    setEditingId(password.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editingId, editData);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(password);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className="row">
      {isEditing ? (
        <input
          type="text"
          name="website"
          value={editData.website}
          onChange={handleChange}
        />
      ) : (
        <span>{password.website}</span>
      )}

      {isEditing ? (
        <input
          type="text"
          name="username"
          value={editData.username}
          onChange={handleChange}
        />
      ) : (
        <span
          className="username"
          onClick={() =>
            handleCopy(password.username, "Username copied to clipboard!")
          }
        >
          {password.username}
        </span>
      )}

      {/* <div className="password"> */}
      {isEditing ? (
        <>
          <input
            type="text"
            name="password"
            value={editData.password}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          {password.showPassword ? (
            <span
              className="password"
              onClick={() =>
                handleCopy(password.password, "Password copied to clipboard!")
              }
            >
              {password.password}
            </span>
          ) : (
            <span
              className="password"
              onClick={() =>
                handleCopy(password.password, "Password copied to clipboard!")
              }
            >
              ••••••••
            </span>
          )}

          <span>
            <button onClick={() => toggleShowPassword(password.id)}>
              {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => handleDelete(password.id)}>Delete</button>
          </span>
        </>
      )}
      {/* </div> */}
    </div>
  );
}
