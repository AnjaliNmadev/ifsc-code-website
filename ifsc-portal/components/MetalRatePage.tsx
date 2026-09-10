// components/MetalRatePage.tsx
'use client';
import { useState } from 'react';

interface MetalRatePageProps {
  cityName: string;
  goldRates: { gram: string; today: string; yesterday: string }[];
  silverRates: { gram: string; today: string; yesterday: string }[];
  allCities: { slug: string; name: string }[];
}

export default function MetalRatePage({ cityName, goldRates, silverRates, allCities }: MetalRatePageProps) {
  const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('silver');

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeTab === 'gold' ? `Gold Rate in ${cityName}` : `Silver Rate in ${cityName}`} Today
          </h1>
          <p className="text-gray-600 text-sm">
            Updated live with market trends, purity benchmarks (999 & 925), and historical pricing data.
          </p>
        </div>

        {/* Tab Switching Buttons (Fixed Bug) */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('gold')}
            className={`py-3 px-6 font-semibold text-base transition-colors border-b-2 ${
              activeTab === 'gold'
                ? 'border-yellow-500 text-yellow-600 bg-yellow-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Gold Price
          </button>
          <button
            onClick={() => setActiveTab('silver')}
            className={`py-3 px-6 font-semibold text-base transition-colors border-b-2 ${
              activeTab === 'silver'
                ? 'border-gray-800 text-gray-900 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Silver Price
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          {activeTab === 'gold' ? (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Gold Rate Per Gram in {cityName}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-700">
                      <th className="p-3">Purity / Weight</th>
                      <th className="p-3">Today Price</th>
                      <th className="p-3">Yesterday Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goldRates.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.gram}</td>
                        <td className="p-3 text-green-600 font-semibold">{row.today}</td>
                        <td className="p-3 text-gray-600">{row.yesterday}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Silver Rate Per Gram in {cityName}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-700">
                      <th className="p-3">Weight</th>
                      <th className="p-3">Today Price</th>
                      <th className="p-3">Yesterday Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {silverRates.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.gram}</td>
                        <td className="p-3 text-green-600 font-semibold">{row.today}</td>
                        <td className="p-3 text-gray-600">{row.yesterday}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Section (ClearTax Style Side Tables & Calculators) */}
      <aside className="space-y-6">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">Rates in Major Cities</h3>
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {allCities.map((city) => (
              <li key={city.slug}>
                <a href={`/silver-rate-${city.slug}`} className="text-blue-600 hover:underline text-sm block py-1">
                  Silver rate in {city.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">Popular Calculators</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/calculators/income-tax-calculator" className="text-blue-600 hover:underline">Income Tax Calculator</a></li>
            <li><a href="/calculators/sip-calculator" className="text-blue-600 hover:underline">SIP Calculator</a></li>
            <li><a href="/calculators/ppf-calculator" className="text-blue-600 hover:underline">PPF Calculator</a></li>
            <li><a href="/calculators/emi-calculator" className="text-blue-600 hover:underline">EMI Calculator</a></li>
            <li><a href="/calculators/fd-calculator" className="text-blue-600 hover:underline">FD Calculator</a></li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
