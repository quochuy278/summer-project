const UserDropdownMenuItem = () => {
  return [
    {
      title: "Profile",
      path: "/users/profile",
    },
    {
      title: "Account",
      path: "/users/account",
    },
    {
      title: "Dashboard",
      path: "/users/dashboard",
    },
    {
      title: "Logout",
      path: "#",
    },
  ];
};

export default UserDropdownMenuItem;
