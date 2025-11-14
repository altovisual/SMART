import { supabase } from "../supabaseClient";
import * as mockAuth from "./mockAuthService";

// 🎭 MOCK MODE: Set to true to bypass Supabase authentication
const USE_MOCK_AUTH = true; // Change to false to use real Supabase

// Login function
export const loginUser = async (email, password, role) => {
  // Use mock authentication if enabled
  if (USE_MOCK_AUTH) {
    console.warn('⚠️ MOCK MODE ACTIVE: Using mock authentication (no Supabase)');
    return await mockAuth.loginUser(email, password, role);
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle login error
    if (error) throw error;

    const user = data.user;

    // Check if the role matches
    if (user.user_metadata.role !== role) {
      console.log("Role does not match. Please try again.");
      alert("Role does not match.");
      const otherPage = role === "user" ? "merchant" : "customer";
      await supabase.auth.signOut();
      throw new Error(
        `This page is for ${role}s. Try logging in as a ${otherPage}.`
      );
    }

    // Check if the user's email is confirmed
    // DEV MODE: Skip email verification for testing
    const SKIP_EMAIL_VERIFICATION = true; // Set to false in production
    
    if (user && (user.email_confirmed_at || SKIP_EMAIL_VERIFICATION)) {
      if (!user.email_confirmed_at) {
        console.warn("⚠️ DEV MODE: Logging in without email verification");
      }
      return user;
    } else {
      console.log("Email not confirmed. Please verify your email.");
      alert(
        "Email not verified. Please check your inbox for a verification link."
      );
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// Signup function
export const signupUser = async (email, username, role, password) => {
  // Use mock authentication if enabled
  if (USE_MOCK_AUTH) {
    console.warn('⚠️ MOCK MODE ACTIVE: Using mock authentication (no Supabase)');
    return await mockAuth.signupUser(email, username, role, password);
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username,
          role,
        },
      },
    });

    if (error) throw error;

    const user = data.user;

    if (user?.id) {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            auth_id: user.id, // Link to auth.users
            name: username,
            email,
            role,
            password,
          },
        ]);

      if (insertError) {
        console.error(
          "Error inserting user into the users table:",
          insertError
        );
        throw insertError;
      } else {
        console.log("User inserted into the users table:", insertData);
      }

      console.log("User created successfully.");
      return user;
    }

    return null;
  } catch (error) {
    console.error("Signup error:", error.message);
    
    // Handle specific error cases
    if (error.message.includes("rate limit")) {
      alert("Too many signup attempts. Please wait a few minutes before trying again.");
    } else if (error.message.includes("Anonymous sign-ins are disabled")) {
      alert("Anonymous sign-ins are not allowed. Please provide valid credentials.");
    } else if (error.message.includes("User already registered")) {
      alert("This email is already registered. Please try logging in instead.");
    } else {
      alert("Error during signup. Please try again.");
    }
    
    throw error;
  }
};
