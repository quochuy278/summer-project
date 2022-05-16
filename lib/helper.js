import axios from "axios";

export const getUser = (userEmail) => {
  return axios({
    method: "post",
    url: `${process.env.url}api/users`,
    data: { userEmail: userEmail },
  });
};
