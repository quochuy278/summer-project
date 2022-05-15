import axios from "axios";
import { getSession } from "next-auth/react";

const UserProfile = (props) => {
  console.log(props);
  return <h1>This is UserProfile</h1>;
};

export default UserProfile;

export const getServerSideProps = async (context) => {
  const session = getSession({ req: context.req });

  console.log(session);
  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
};
