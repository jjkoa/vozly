// components/auth/SignUpForm.tsx
"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useTranslations } from 'next-intl';
import Link from 'next/link'; // Use next/link for client-side navigation
//import Link from 'next-intl/link'; // For internationalized routing

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('SignUpPage'); // Assuming you have translations for SignUpPage

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
      });
      // User will need to verify email before they can sign in
      alert("Please check your email to verify your account");
    } catch (error) {
      console.error("Sign up failed:", error);
      // Add user-friendly error handling here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Card title={t('title')} className="w-full max-w-25rem shadow-2">
        <form onSubmit={handleSignUp} className="p-fluid">
          <div className="field">
            <label htmlFor="name">{t('nameLabel')}</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
            />
          </div>
          <div className="field">
            <label htmlFor="password">{t('passwordLabel')}</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false} // Or set to true for password strength indicator
              toggleMask
              required
            />
          </div>
          <Button
            type="submit"
            label={isLoading ? t('creatingAccount') : t('signUpButton')}
            className="mt-2"
            disabled={isLoading}
          />
        </form>
        <Divider align="center" className="my-3"><b>{t('or')}</b></Divider>
        {/* Optional: Add Google Sign-Up or other OAuth providers here if needed */}
        <div className="text-center mt-3">
          <span>{t('alreadyHaveAccount')} </span>
          <Link href="/login" className="text-sm text-primary hover:underline">{t('loginLink')}</Link>
        </div>
      </Card>
    </div>
  );
}
