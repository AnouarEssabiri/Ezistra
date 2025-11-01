"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDatabase } from "@/hooks/useDatabase"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { FileText, Users, CheckCircle, AlertCircle } from "lucide-react"

const mockChartData = [
  { name: "Jan", documents: 4, forms: 2 },
  { name: "Feb", documents: 3, forms: 2 },
  { name: "Mar", documents: 2, forms: 9 },
  { name: "Apr", documents: 3, forms: 8 },
  { name: "May", documents: 4, forms: 3 },
  { name: "Jun", documents: 5, forms: 4 },
]

export function Dashboard() {
  const { repos, isReady, error } = useDatabase()

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalAddresses: 0,
    totalForms: 0,
  })
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!isReady) return

      try {
        setLoading(true)
        setDbError(null)

        const [usersCount, docsCount, addressCount, univCount] = await Promise.all([
          repos.users.count().catch(() => 0),
          repos.documents.count().catch(() => 0),
          repos.address.count().catch(() => 0),
          repos.university.count().catch(() => 0),
        ])

        setStats({
          totalUsers: usersCount,
          totalDocuments: docsCount,
          totalAddresses: addressCount,
          totalForms: univCount,
        })
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to fetch database statistics"
        setDbError(errorMsg)
        console.error("Database error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [isReady, repos])

  return (
    <div className="space-y-6">
      {/* Database Status */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>Database initialization error: {error.message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {dbError && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <span>Database connection warning: {dbError}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isReady && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Database is ready</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-3xl font-bold">{loading ? "-" : stats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="text-3xl font-bold">{loading ? "-" : stats.totalDocuments}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-3xl font-bold">{loading ? "-" : stats.totalAddresses}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-orange-600" />
              <span className="text-3xl font-bold">{loading ? "-" : stats.totalForms}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="documents" stroke="#3b82f6" />
                <Line type="monotone" dataKey="forms" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="documents" fill="#3b82f6" />
                <Bar dataKey="forms" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => repos.users.getAll().then(() => alert("Fetched all users"))}>
              Test: Get All Users
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                repos.documents.count().then((count) => alert(`Total documents: ${count}`))
              }
            >
              Test: Count Documents
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Repositories:", repos)
                alert("Check console for repos")
              }}
            >
              Debug: Log Repos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
