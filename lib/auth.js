import axios from "axios";
import { hash, compare } from "bcryptjs";


export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export const SignUp =async (enteredUsername, enteredEmail,enteredPassword) => {
 return axios({
    method: "post",
    url: `${process.env.NEXTAUTH_URL}api/auth/signup`,
    data: {
      userName: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    },
  })
};

export const TeacherSignup =async (enteredUsername, enteredEmail,enteredPassword,experiences,department) => {
  return axios({
     method: "post",
     url: `${process.env.NEXTAUTH_URL}api/auth/signup/teacher`,
     data: {
       userName: enteredUsername,
       email: enteredEmail,
       password: enteredPassword,
       experiences: experiences,
       department: department, 
     },
   })
 };
