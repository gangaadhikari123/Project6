"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, LogOut, RefreshCw, MapPin, Square, Bed, Bath, Calendar, Car } from "lucide-react"
import type { PredictionResult } from "../app"

interface ResultsPageProps {
  result: PredictionResult
  onNewPrediction: () => void
  onLogout: () => void
}

export default function ResultsPage({ result, onNewPrediction, onLogout }: ResultsPageProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPriceInWords = (price: number) => {
    const crores = Math.floor(price / 10000000)
    const lakhs = Math.floor((price % 10000000) / 100000)
    const thousands = Math.floor((price % 100000) / 1000)

    let result = ""
    if (crores > 0) result += `${crores} Crore `
    if (lakhs > 0) result += `${lakhs} Lakh `
    if (thousands > 0) result += `${thousands} Thousand `

    return result.trim() || "Less than 1 Thousand"
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-semibold text-blue-600">GHARMULYA</span>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Price Prediction Result</h1>
          <p className="text-gray-600">Based on the property details you provided</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Predicted Price</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">{formatPrice(result.price)}</div>
              <div className="text-lg text-green-600">({formatPriceInWords(result.price)} Rupees)</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-medium">Location:</span>
                <span className="ml-2">{result.details.location}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-5 h-5 text-purple-500 mr-3" />
                <span className="font-medium">Area:</span>
                <span className="ml-2">{result.details.area} sq.ft</span>
              </div>
              <div className="flex items-center">
                <Bed className="w-5 h-5 text-orange-500 mr-3" />
                <span className="font-medium">Bedrooms:</span>
                <span className="ml-2">{result.details.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 text-cyan-500 mr-3" />
                <span className="font-medium">Bathrooms:</span>
                <span className="ml-2">{result.details.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-red-500 mr-3" />
                <span className="font-medium">House Age:</span>
                <span className="ml-2">{result.details.houseAge} years</span>
              </div>
              <div className="flex items-center">
                <Car className="w-5 h-5 text-gray-500 mr-3" />
                <span className="font-medium">Garage:</span>
                <span className="ml-2 capitalize">{result.details.garage}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Want to check another property?</h3>
            <Button onClick={onNewPrediction} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-5 h-5 mr-2" />
              START NEW PREDICTION
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>* This prediction is based on general market trends and property characteristics.</p>
          <p>Actual market prices may vary based on current market conditions and specific property features.</p>
        </div>
      </div>
    </div>
  )
}
