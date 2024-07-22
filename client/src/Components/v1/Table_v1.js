import { usePasswords } from "./PasswordContext";
import Row from "./Row_v1";
import ".././Table.css";

function Table() {
  const {
    passwordsList,
    toggleShowPassword,
    handleCopy,
    handleUpdate,
    handleDelete,
  } = usePasswords();

  if (!passwordsList || passwordsList.length === 0) return null;

  return (
    <div className="table-container">
      <div className="header">
        <span>Website</span>
        <span>Username</span>
        <span>Password</span>
      </div>

      {passwordsList.map((password) => (
        <Row
          key={password.id}
          password={password}
          toggleShowPassword={toggleShowPassword}
          handleCopy={handleCopy}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Table;
