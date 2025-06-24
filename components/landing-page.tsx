"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, TrendingUp, MapPin } from "lucide-react"

interface LandingPageProps {
  onEnterLogin: () => void
}

export default function LandingPage({ onEnterLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">HOUSE PRICE PREDICTION</h1>
        <div className="flex items-center justify-center mb-6">
          <Home className="w-8 h-8 text-blue-600 mr-2" />
          <span className="text-2xl md:text-3xl font-semibold text-blue-600">GHARMULYA</span>
        </div>
      </div>

      <Card className="w-full max-w-2xl mb-8">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to GHARMULYA</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Get accurate house price predictions in Nepal with our advanced AI-powered system. Simply enter your
              property details and get instant price estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold">Location Based</h3>
              <p className="text-sm text-gray-600">Accurate pricing by location</p>
            </div>
            <div className="text-center">
              <Home className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">Property Details</h3>
              <p className="text-sm text-gray-600">Comprehensive analysis</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold">Instant Results</h3>
              <p className="text-sm text-gray-600">Get prices in seconds</p>
            </div>
          </div>

          <Button
            onClick={onEnterLogin}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Enter to Login Page
          </Button>
        </CardContent>
      </Card>

      <p className="text-gray-500 text-center max-w-md">
        Start your property valuation journey today and make informed decisions about real estate investments in Nepal.
      </p>
    </div>
  )
}
