import { getSession } from "next-auth/react";
import LoginForm from "../../../components/login/loginform";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: { session },
  };
};
