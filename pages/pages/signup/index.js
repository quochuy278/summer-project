import { getSession } from "next-auth/react";
import {SignUpForm} from "../../../components";

const handler = () => {
  return <SignUpForm />;
};

export default handler;
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