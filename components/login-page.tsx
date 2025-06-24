"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Home, Mail, Phone } from "lucide-react"
import type { PageType } from "../app"

interface LoginPageProps {
  mode: "login" | "signup"
  onLogin: (email: string) => void
  onSwitchMode: (mode: PageType) => void
  onBack: () => void
}

export default function LoginPage({ mode, onLogin, onSwitchMode, onBack }: LoginPageProps) {
  const [loginType, setLoginType] = useState<"email" | "phone">("email")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const identifier = loginType === "email" ? formData.email : formData.phone
    if (identifier && formData.password) {
      onLogin(identifier)
    }
  }

  const handleForgotPassword = () => {
    alert("Password reset link would be sent to your email/phone")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Button variant="ghost" onClick={onBack} className="absolute top-4 left-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Home className="w-8 h-8 text-blue-600 mr-2" />
          <span className="text-2xl font-semibold text-blue-600">GHARMULYA</span>
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {mode === "login" ? "Login to Your Account" : "Create New Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </TabsContent>

              <TabsContent value="phone" className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+977-9800000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {mode === "login" ? "Login" : "Create Account"}
            </Button>

            {mode === "login" && (
              <Button type="button" variant="link" onClick={handleForgotPassword} className="w-full text-sm">
                Forgot your password?
              </Button>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <Button
                variant="link"
                onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
                className="p-0 h-auto font-semibold"
              >
                {mode === "login" ? "Sign up" : "Login"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
