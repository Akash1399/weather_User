import React, { useState } from "react";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/index";
import "./component.css";

function UserList() {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);

  // State variables for search query and filtered users
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Function to handle search input change and filter users using regex
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    try {
      const regex = new RegExp(query, "i"); // "i" for case-insensitive search

      // Filter users based on first name or last name matching the regex
      const filtered = users.filter(
        (user) =>
          regex.test(user.firstName) || regex.test(user.lastName)
      );
      setFilteredUsers(filtered);
    } catch (error) {
      // Handle invalid regex input
      setFilteredUsers([]);
    }
  };

  return (
    <>
      <CssBaseline />

      <Typography component="h1" variant="h5">
        Users List
      </Typography>

      {/* Search input fields */}
      <TextField
        label="Search by First Name or Last Name (Regex)"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ margin: "16px 0" }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>ZIP</TableCell>
              <TableCell>DOB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.zip}</TableCell>
                <TableCell>{user.DOB}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="link_tag" onClick={() => navigate("/sign_up")}>
        Register the User
      </p>
    </>
  );
}

export default UserList;
