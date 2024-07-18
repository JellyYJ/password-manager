import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Row.css";

export default function Row({
  password,
  index,
  handleCopy,
  toggleShowPassword,
  handleUpdate,
  isEditing,
  onEdit,
  edited,
  setEdited,
  handleDelete,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited({ ...edited, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(index, edited);
  };

  return (
    <div className="row">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={edited.website}
            onChange={handleChange}
          />
        </form>
      ) : (
        <span>{password.website}</span>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={edited.username}
            onChange={handleChange}
          />
        </form>
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

      <div className="password">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="password"
              value={edited.password}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            {password.showPassword ? (
              <span
                onClick={() =>
                  handleCopy(password.password, "Password copied to clipboard!")
                }
              >
                {password.password}
              </span>
            ) : (
              <span
                onClick={() =>
                  handleCopy(password.password, "Password copied to clipboard!")
                }
              >
                ••••••••
              </span>
            )}
            <button onClick={() => toggleShowPassword(index)}>
              {password.showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(password.id)}>de</button>
          </>
        )}
      </div>
    </div>
  );
}
