"use server";

import { auth } from "@/lib/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    // return { success: true };
  } catch (error) {
    // return { error: "Failed to sign in" };
  }
  redirect("/login");
}

export async function login(formData: FormData) {
  const cookiesStore = await cookies();
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    cookiesStore.set("fb-auth-token", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });
  } catch (error) {}
  redirect("/dashboard");
}
