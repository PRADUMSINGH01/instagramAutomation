import admin from "firebase-admin";

const globalForAdmin = global as unknown as { adminApp?: admin.app.App };

// Make sure we don’t re-initialize in hot reload
if (!globalForAdmin.adminApp) {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Missing Firebase environment variables");
  }

  globalForAdmin.adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminApp = globalForAdmin.adminApp!;
export const adminDb = adminApp.firestore();
export const adminAuth = adminApp.auth();
