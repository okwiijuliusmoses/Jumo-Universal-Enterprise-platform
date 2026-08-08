import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  QueryConstraint
} from "firebase/firestore";
import { auth } from "./auth";
import firebaseConfig from "../../../firebase-applet-config.json";

// Initialize Firebase App if not already done
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: The app will break if the database ID isn't correctly mapped
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");

// Operation types for error reporting
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// CRITICAL EXCEPTION HANDLING: Formats and throws permission or operation errors as stringified JSON context blocks
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  
  console.error("[FIRESTORE_ERROR] Detail Context: ", JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

// CRITICAL CONSTRAINT: On initial load, validate the cloud connection
export async function testConnection(): Promise<void> {
  try {
    // Attempt standard server fetch to ensure network access is online
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("[FIRESTORE] Connection validation successful.");
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("[FIRESTORE_WARN] Firebase client appears to be offline. Verify credentials.");
    } else {
      console.log("[FIRESTORE] Initial silent validation probe completed (not-found is normal).");
    }
  }
}

// Wrapped safe helper for reading a single document
export async function getDocument<T = any>(collectionPath: string, docId: string): Promise<T | null> {
  const pathStr = `${collectionPath}/${docId}`;
  try {
    const docRef = doc(db, collectionPath, docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as T;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, pathStr);
  }
}

// Wrapped safe helper for writing / replacing a document
export async function setDocument<T extends object>(collectionPath: string, docId: string, data: T): Promise<void> {
  const pathStr = `${collectionPath}/${docId}`;
  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, data);
    console.log(`[FIRESTORE] Document set successfully at ${pathStr}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathStr);
  }
}

// Wrapped safe helper for partially updating a document
export async function updateDocument<T extends object>(collectionPath: string, docId: string, data: Partial<T>): Promise<void> {
  const pathStr = `${collectionPath}/${docId}`;
  try {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, data as any);
    console.log(`[FIRESTORE] Document updated successfully at ${pathStr}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, pathStr);
  }
}

// Wrapped safe helper for deleting a document
export async function deleteDocument(collectionPath: string, docId: string): Promise<void> {
  const pathStr = `${collectionPath}/${docId}`;
  try {
    const docRef = doc(db, collectionPath, docId);
    await deleteDoc(docRef);
    console.log(`[FIRESTORE] Document deleted at ${pathStr}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, pathStr);
  }
}

// Wrapped safe helper for listing collection entries
export async function listDocuments<T = any>(collectionPath: string, ...queryConstraints: QueryConstraint[]): Promise<T[]> {
  try {
    const colRef = collection(db, collectionPath);
    const q = query(colRef, ...queryConstraints);
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as unknown as T);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

// Run the immediate boot test probe
testConnection().catch(err => {
  console.warn("[FIRESTORE_WARN] Boot probe check warning: ", err);
});
