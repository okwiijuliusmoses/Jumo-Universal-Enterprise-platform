import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  UploadResult
} from "firebase/storage";
import firebaseConfig from "../../../firebase-applet-config.json";

// Initialize Firebase App if not already done
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Firebase Storage client instance
export const storage = getStorage(app);

/**
 * Uploads a file Blob or File object to Firebase Storage at the designated path.
 * 
 * @param path - Destination storage path (e.g. "avatars/user-123.jpg")
 * @param file - File or Blob object to upload
 * @returns Promise containing the upload result details
 */
export async function uploadFile(path: string, file: Blob | File): Promise<UploadResult> {
  try {
    const storageRef = ref(storage, path);
    const result = await uploadBytes(storageRef, file);
    console.log(`[STORAGE] Uploaded successfully to path: ${path}`);
    return result;
  } catch (error: any) {
    console.error(`[STORAGE_ERROR] Upload failed at path ${path}: `, error.message);
    throw error;
  }
}

/**
 * Resolves the public, authenticated download URL for a storage asset.
 * 
 * @param path - Storage path of the asset
 * @returns Promise resolving to the HTTPS download URL string
 */
export async function getFileDownloadURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    console.error(`[STORAGE_ERROR] Failed to fetch download URL for path ${path}: `, error.message);
    throw error;
  }
}

/**
 * Deletes an existing asset from the storage bucket.
 * 
 * @param path - Storage path of the asset to delete
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    console.log(`[STORAGE] Deleted asset successfully: ${path}`);
  } catch (error: any) {
    console.error(`[STORAGE_ERROR] Deletion failed for path ${path}: `, error.message);
    throw error;
  }
}
