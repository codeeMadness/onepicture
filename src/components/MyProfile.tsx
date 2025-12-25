import { auth } from "../auth/firebase-config";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LoadingIndicator from "./LoadingIndicator";
import { useAuth } from "../context/AuthContext";

export default function MyProfile() {
    const {userDetail,setUserDetail} = useAuth();

    const logout = async () => {
        try {
            await auth.signOut().then(() => {
                setUserDetail(null);
            })
        } catch (error) {
            console.error("Error loging out: ", error)
        }
    }

    if(!userDetail) return <LoadingIndicator />

    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <Typography variant="h5">Welcome {userDetail.displayName}!</Typography>
                <Box sx={{display: "flex", flexDirection: "row", alignItems:"center", gap: "0.5rem"}}>
                    <Avatar alt={userDetail.displayName ?? ""} src={userDetail.photoURL ?? ""} />
                    <Typography variant="body1">{userDetail.email}</Typography>
                </Box>
                <Button variant="contained" onClick={logout}>Logout</Button>
            </Box>
        </Box>
    )
}