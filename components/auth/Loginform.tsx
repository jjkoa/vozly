
//components/auth/LoginForm.tsx
"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await authClient.signIn.email({
        email,
        password,
      })
      // Redirect will happen automatically
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      })
    } catch (error) {
      console.error("Google login failed:", error)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleEmailLogin} className="space-y-4">
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
          {isLoading ? "Signing in..." : "Sign in with Email"}
        </button>
      </form>
      
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}