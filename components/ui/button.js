import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Link from "next/link";
    const MuiCustomButton = styled (Button)((theme) => ({
        width: 250
    }))

const CustomButton = (props) => {
    return (
        <MuiCustomButton>
            <Link href={props.href}>
            {props.children}
            </Link>
        </MuiCustomButton>
    )
}
export default CustomButton