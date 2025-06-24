"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, LogOut, RotateCcw } from "lucide-react"
import type { HouseDetails } from "../app"

interface InputDetailsPageProps {
  onPredict: (details: HouseDetails) => void
  onLogout: () => void
  userEmail: string
}

export default function InputDetailsPage({ onPredict, onLogout, userEmail }: InputDetailsPageProps) {
  const [details, setDetails] = useState<HouseDetails>({
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    houseAge: "",
    garage: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      details.location &&
      details.area &&
      details.bedrooms &&
      details.bathrooms &&
      details.houseAge &&
      details.garage
    ) {
      onPredict(details)
    }
  }

  const handleReset = () => {
    setDetails({
      location: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      houseAge: "",
      garage: "",
    })
  }

  const locations = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Pokhara",
    "Chitwan",
    "Butwal",
    "Biratnagar",
    "Dharan",
    "Janakpur",
    "Nepalgunj",
  ]

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-semibold text-blue-600">GHARMULYA</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {userEmail}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Enter Property Details</CardTitle>
            <p className="text-center text-gray-600">Fill in the details below to get your house price prediction</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={details.location}
                    onValueChange={(value) => setDetails({ ...details, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq.ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="e.g., 1500"
                    value={details.area}
                    onChange={(e) => setDetails({ ...details, area: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                  <Select
                    value={details.bedrooms}
                    onValueChange={(value) => setDetails({ ...details, bedrooms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                  <Select
                    value={details.bathrooms}
                    onValueChange={(value) => setDetails({ ...details, bathrooms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="houseAge">House Age (years)</Label>
                  <Input
                    id="houseAge"
                    type="number"
                    placeholder="e.g., 5"
                    value={details.houseAge}
                    onChange={(e) => setDetails({ ...details, houseAge: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="garage">Garage Available</Label>
                  <Select value={details.garage} onValueChange={(value) => setDetails({ ...details, garage: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  PREDICT PRICE
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
