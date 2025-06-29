import { GoogleOAuthProvider } from "@react-oauth/google";
import SignInPage from "@/components/SignIn_Page/SignInPage";

function GoogleWrapper() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <SignInPage />
        </GoogleOAuthProvider>
    );
}
export default GoogleWrapper;