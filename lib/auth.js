import axios from "axios";
import { hash, compare } from "bcryptjs";
import { useRouter } from "next/router";
export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export const StudentSignUp =async (enteredUsername, enteredEmail,enteredPassword, isTeacher) => {
 return axios({
    method: "post",
    url: `${process.env.url}api/auth/signup`,
    data: {
      userName: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      isTeacher: isTeacher
    },
  })
};

export const TeacherSignup =async (enteredUsername, enteredEmail,enteredPassword, isTeacher) => {
  return axios({
     method: "post",
     url: `${process.env.url}api/auth/signup`,
     data: {
       userName: enteredUsername,
       email: enteredEmail,
       password: enteredPassword,
       isTeacher: isTeacher
     },
   })
 };
