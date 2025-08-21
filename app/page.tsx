import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Zap, Smartphone, Lock, Users } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/Navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Document Storage &<span className="text-blue-600"> Smart Form Filling</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Store your personal documents securely and automatically fill out school registrations, competition forms,
            and applications with one click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make form filling effortless and secure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription>
                  Your documents are encrypted with AES-256 encryption and stored securely
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Smart Document Management</CardTitle>
                <CardDescription>
                  Upload, organize, and tag your documents with intelligent categorization
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>One-Click Form Filling</CardTitle>
                <CardDescription>
                  Automatically fill out any form using your stored information and documents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Mobile Optimized</CardTitle>
                <CardDescription>Fill forms on any device with our responsive design and mobile app</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Lock className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your data never leaves our secure servers. We don't share or sell your information
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Family Accounts</CardTitle>
                <CardDescription>
                  Manage documents for your entire family with role-based access controls
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Simplify Your Form Filling?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who save hours every month with Ezistra
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Ezistra</span>
              </div>
              <p className="text-gray-400">Secure document storage and smart form filling for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ezistra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
