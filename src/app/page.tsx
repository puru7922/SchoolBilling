"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate sign-in logic here. In a real application,
      // you would authenticate the user with a backend service.
      // For demonstration purposes, we simply check if the email and password are not empty.
      if (email && password) {
        // Sign-in successful, redirect to dashboard
        router.push("/dashboard");
      } else {
        // Sign-in failed, display an error message
        alert("Invalid credentials. Please enter valid email and password.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred during sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">CampusConnect</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={loading} onClick={handleSignIn}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </CardContent>
        <div className="px-6 pb-6 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
