import axios from "axios"

export const getUser = () => {
    return axios({
        method: "get",
        url: `${process.env.url}api/users`,
      })
}