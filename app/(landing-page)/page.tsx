'use client'

import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  const productsRef = useRef(null)
  function scrollToProducts() {
    if (productsRef.current) {
      ;(productsRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Glovee - Global Talent Mobility Tools</title>
        <meta name="description" content="Shaping the backbone of global talent mobility" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed z-50 w-full border-b bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Glovee
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <button onClick={scrollToProducts} className="text-gray-700 hover:text-gray-900">
                Products
              </button>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="items-center lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                Shaping the backbone of global talent mobility, one tool at a time.
              </h1>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/hero-image.jpg"
                  alt="Global mobility illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="max-w-3xl text-xl text-gray-700">
            Our mission is to build tools and infrastructure that allow countries to attract the
            talents they exactly desire, and the immigrants to find the best match and successfully
            immigrate and integrate with the destination societies. We will be your global vision.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">Products</h2>

          {/* CRM Product Card */}
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="lg:grid lg:grid-cols-2">
              <div className="relative h-[400px]">
                <Image
                  src="/crm-screenshot.jpg" // Add your CRM screenshot to public folder
                  alt="CRM for Immigration Consultants"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  CRM for Immigration Consultants
                </h3>
                <p className="mb-6 text-gray-700">
                  A comprehensive solution for managing immigration cases, client information, and
                  documents - all in one secure platform.
                </p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Centralized document management
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Case progress tracking
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Secure client communication
                  </li>
                </ul>
                <Link
                  href="/products/crm"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
                >
                  Learn More
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">© 2025 Glovee. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
