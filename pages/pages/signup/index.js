import { useRouter } from "next/router";
import ProjectCard from "../../../components/layout/Card";
import Button from "@mui/material/Button";
import Link from "next/link";
import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";

const CustomMuiButtom = styled(Button)((theme) => ({
  width: 300,
  marginRight: "10px",
  marginLeft: "10px",
  borderRadius: "20px",
  height: "50px",
}));
const CustomMuiBox = styled(Box)((theme) => ({
  display: "flex",
  flexDirection: "column",
}));

const handler = () => {
  const router = useRouter();
  const query = router.query;

  return (
    <ProjectCard>
      <CustomMuiBox>
        <Typography sx={{ textAlign: "center", mb: "80px",fontSize: '3rem'}}>
          Choose an option
        </Typography>
        <Box>
          <CustomMuiButtom variant="contained">
            <Link href="/pages/signup/student">Sign up as a student</Link>
          </CustomMuiButtom>
          <CustomMuiButtom variant="contained">
            <Link href="/pages/signup/teacher">Sign up as a teacher</Link>
          </CustomMuiButtom>
        </Box>
      </CustomMuiBox>
    </ProjectCard>
  );
};
export default handler;
