import axios from "axios";

export const getUser = (userEmail) => {
  return axios({
    method: "post",
    url: `${process.env.NEXTAUTH_URL}api/users`,
    data: { userEmail: userEmail },
  });
};
