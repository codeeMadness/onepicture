import { GitHub, Google } from "@mui/icons-material";
import { Alert, Box, Button } from "@mui/material";
import { fetchSignInMethodsForEmail, GithubAuthProvider, GoogleAuthProvider, linkWithCredential, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../auth/firebase-config";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function SignIn() {
    const { setUserDetail } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string>("");

    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider).then(async res => {
            setUserDetail(res.user)
        })
    }

    const githubSignIn = () => {
        signInWithPopup(auth, githubProvider).then(async res => {
            setUserDetail(res.user);
        }).catch((error) => {
            setErrorMsg(error.code)
        });
    }


    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Button variant="contained" startIcon={<Google />} onClick={googleSignIn}>Sign in with Google</Button>
                <Button variant="outlined" startIcon={<GitHub />} onClick={githubSignIn}>Sign in with Github</Button>
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            </Box>
        </Box>
    )
}