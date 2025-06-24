"use client"

import { useState } from "react"
import LandingPage from "./components/landing-page"
import LoginPage from "./components/login-page"
import InputDetailsPage from "./components/input-details-page"
import ResultsPage from "./components/results-page"

export type PageType = "landing" | "login" | "signup" | "input" | "results"

export interface HouseDetails {
  location: string
  area: string
  bedrooms: string
  bathrooms: string
  houseAge: string
  garage: string
}

export interface PredictionResult {
  price: number
  details: HouseDetails
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing")
  const [user, setUser] = useState<string | null>(null)
  const [houseDetails, setHouseDetails] = useState<HouseDetails>({
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    houseAge: "",
    garage: "",
  })
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

  const handleLogin = (email: string) => {
    setUser(email)
    setCurrentPage("input")
  }

  const handlePrediction = (details: HouseDetails) => {
    setHouseDetails(details)
    // Simple price prediction algorithm (in real app, this would be an API call)
    const basePrice = 5000000 // Base price in NPR
    const areaMultiplier = Number.parseInt(details.area) * 8000
    const bedroomBonus = Number.parseInt(details.bedrooms) * 500000
    const bathroomBonus = Number.parseInt(details.bathrooms) * 300000
    const ageDeduction = Number.parseInt(details.houseAge) * 50000
    const garageBonus = details.garage === "yes" ? 800000 : 0

    const predictedPrice = basePrice + areaMultiplier + bedroomBonus + bathroomBonus - ageDeduction + garageBonus

    setPredictionResult({
      price: Math.max(predictedPrice, 1000000), // Minimum price
      details,
    })
    setCurrentPage("results")
  }

  const handleNewPrediction = () => {
    setHouseDetails({
      location: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      houseAge: "",
      garage: "",
    })
    setPredictionResult(null)
    setCurrentPage("input")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("landing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === "landing" && <LandingPage onEnterLogin={() => setCurrentPage("login")} />}

      {(currentPage === "login" || currentPage === "signup") && (
        <LoginPage
          mode={currentPage}
          onLogin={handleLogin}
          onSwitchMode={(mode) => setCurrentPage(mode)}
          onBack={() => setCurrentPage("landing")}
        />
      )}

      {currentPage === "input" && user && (
        <InputDetailsPage onPredict={handlePrediction} onLogout={handleLogout} userEmail={user} />
      )}

      {currentPage === "results" && predictionResult && (
        <ResultsPage result={predictionResult} onNewPrediction={handleNewPrediction} onLogout={handleLogout} />
      )}
    </div>
  )
}
