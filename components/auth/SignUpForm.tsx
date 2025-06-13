//components/auth/SignUpForm.tsx (Example usage)
"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useState } from "react"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
      })
      // User will need to verify email before they can sign in
      alert("Please check your email to verify your account")
    } catch (error) {
      console.error("Sign up failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  )
}