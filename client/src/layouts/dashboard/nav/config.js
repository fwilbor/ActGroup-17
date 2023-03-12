// component
import React from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { logoutRoute } from "src/utils/APIRoutes";
import SvgColor from "../../../components/svg-color";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: black;
  }
`;

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const id = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      const response = await axios.get(`${logoutRoute}/${id}`);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLogout}>
      <FiLogOut />
    </Button>
  );
};

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: "chat",
    path: "/chat",
    icon: icon("ic_blog"),
  },
  // {
  //   title: 'kids messenger',
  //   path: '/messenger',
  //   icon: icon('ic_blog'),
  // },
  {
    title: "add friend",
    path: "/addfriend",
    icon: icon("ic_blog"),
  },
  // {
  //   title: 'add Image',
  //   path: '/addimage',
  //   icon: icon('ic_disabled'),
  // },
  // Change icon to camera.
  {
    title: "set avatar",
    path: "/setavatar",
    icon: icon("ic_user"),
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <LogoutButton />,
  },
];

export default navConfig;
