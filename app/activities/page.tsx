"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Clock, Search, Filter, Calendar } from "lucide-react"

interface Activity {
  id: number
  type: string
  title: string
  description: string
  time: string
  date: string
  status: "pending" | "completed" | "rejected"
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "form_filled",
      title: "School Registration Form",
      description: "Automatically filled registration for Lincoln High School",
      time: "10:30 AM",
      date: "2025-11-02",
      status: "completed",
    },
    {
      id: 2,
      type: "document_uploaded",
      title: "Birth Certificate",
      description: "New document uploaded and categorized",
      time: "09:15 AM",
      date: "2025-11-02",
      status: "completed",
    },
    {
      id: 3,
      type: "reminder",
      title: "Competition Deadline",
      description: "Math Olympiad registration closes in 3 days",
      time: "02:45 PM",
      date: "2025-11-01",
      status: "pending",
    },
    // Add more sample activities here
  ])

  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const handleComplete = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? {...activity, status: "completed"} : activity
    ))
  }

  const handleReject = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? {...activity, status: "rejected"} : activity
    ))
  }

  const filteredActivities = activities.filter(activity => {
    const matchesStatus = filterStatus === "all" || activity.status === filterStatus
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate = !dateFilter || activity.date === dateFilter
    return matchesStatus && matchesSearch && matchesDate
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity History</h1>
          <p className="text-gray-600">Track and manage all your activities</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter and search through your activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search activities..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
            <CardDescription>
              Showing {filteredActivities.length} {filterStatus !== "all" ? filterStatus : ""} activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : activity.status === "rejected" ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{activity.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium">
                        Status: <span className={
                          activity.status === "completed" ? "text-green-600" :
                          activity.status === "rejected" ? "text-red-600" :
                          "text-yellow-600"
                        }>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </span>
                      {activity.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleComplete(activity.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(activity.id)}
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}