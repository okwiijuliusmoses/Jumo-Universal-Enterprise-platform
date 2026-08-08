import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import firebaseConfig from "../../../firebase-applet-config.json";

// Initialize Firebase App for client SDK
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Enforce Google Sign-In with popup as recommended for the AI Studio preview environment
export async function signInWithGoogle(): Promise<User> {
  try {
    googleProvider.setCustomParameters({
      prompt: "select_account"
    });
    const result = await signInWithPopup(auth, googleProvider);
    console.log("[FIREBASE_AUTH] Sign-in successful for user: ", result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("[FIREBASE_AUTH_ERROR] Popup login failed: ", error.message);
    throw error;
  }
}

// Log out user cleanly
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
    console.log("[FIREBASE_AUTH] User signed out successfully.");
  } catch (error: any) {
    console.error("[FIREBASE_AUTH_ERROR] Logout failed: ", error.message);
    throw error;
  }
}

// Subscribe to auth state updates
export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
