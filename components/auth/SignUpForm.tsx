// components/auth/SignUpForm.tsx
"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const t = useTranslations('SignUpPage');

  // Username validation function
  const validateUsername = (username: string): string | null => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 30) {
      return "Username must be less than 30 characters";
    }
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      return "Username can only contain letters, numbers, underscores, and dots";
    }
    return null;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      setIsLoading(false);
      return;
    }
    
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        username, // Add username to the signup
      });
      
      setSuccess("Account created successfully! Please check your email to verify your account.");
      // Optional: Clear form
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");
      
    } catch (error: any) {
      console.error("Sign up failed:", error);
      
      // Handle specific error types
      let errorMessage = "Sign up failed. Please try again.";
      
      if (error?.message) {
        if (error.message.includes("already exists") || error.message.includes("duplicate")) {
          errorMessage = "An account with this email or username already exists.";
        } else if (error.message.includes("username")) {
          errorMessage = "Username is already taken. Please choose a different one.";
        } else if (error.message.includes("email")) {
          errorMessage = "Invalid email address or email already in use.";
        } else if (error.message.includes("password")) {
          errorMessage = "Password does not meet requirements.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Card title={t('title')} className="w-full max-w-25rem shadow-2">
        <form onSubmit={handleSignUp} className="p-fluid">
          {error && (
            <Message 
              severity="error" 
              text={error} 
              className="mb-3" 
            />
          )}
          
          {success && (
            <Message 
              severity="success" 
              text={success} 
              className="mb-3" 
            />
          )}

          <div className="field">
            <label htmlFor="name">{t('nameLabel')}</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="username">{t('usernameLabel')}</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="3-30 characters, letters, numbers, _, ."
              required
              disabled={isLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="email">{t('emailLabel')}</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="password">{t('passwordLabel')}</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={true} // Enable password strength indicator
              toggleMask
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            label={isLoading ? t('creatingAccount') : t('signUpButton')}
            className="mt-2"
            disabled={isLoading}
            loading={isLoading}
          />
        </form>

        <Divider align="center" className="my-3"><b>{t('or')}</b></Divider>
        
        {/* Google Sign-Up Button */}
        <Button
          label={t('signUpWithGoogle')}
          icon="pi pi-google"
          className="p-button-outlined"
          onClick={() => authClient.signIn.social({ provider: "google" })}
          disabled={isLoading}
        />

        <div className="text-center mt-3">
          <span>{t('alreadyHaveAccount')} </span>
          <Link href="/login" className="text-sm text-primary hover:underline">
            {t('loginLink')}
          </Link>
        </div>
      </Card>
    </div>
  );
}