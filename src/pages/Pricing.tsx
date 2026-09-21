import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Droplets, Calculator, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatGHS } from '../config';

export default function PricingPage() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  // Calculator state
  const [tankCapacity, setTankCapacity] = useState('1000');
  const [numTanks, setNumTanks] = useState(1);
  const [tankCondition, setTankCondition] = useState('good');
  const [accessibility, setAccessibility] = useState('easy');
  const [serviceType, setServiceType] = useState('professional');

  const capacityPrices: Record<string, number> = {
    '1000': 150, '2000': 200, '5000': 300, '10000': 500, '10000+': 0
  };
  const serviceMultipliers: Record<string, number> = {
    'essential': 1, 'professional': 1.67, 'premium': 2.33, 'commercial': 3.33
  };
  const conditionAdditions: Record<string, number> = {
    'good': 0, 'moderate': 50, 'heavy': 100
  };
  const accessAdditions: Record<string, number> = {
    'easy': 0, 'difficult': 50, 'rooftop': 100
  };

  const getDiscount = (tanks: number) => {
    if (tanks >= 6) return 0.15;
    if (tanks >= 3) return 0.10;
    if (tanks >= 2) return 0.05;
    return 0;
  };

  const calculateEstimate = () => {
    const basePrice = capacityPrices[tankCapacity] || 150;
    const serviceMultiplier = serviceMultipliers[serviceType] || 1;
    const conditionAdd = conditionAdditions[tankCondition] || 0;
    const accessAdd = accessAdditions[accessibility] || 0;
    const discount = getDiscount(numTanks);

    let pricePerTank = (basePrice * serviceMultiplier) + conditionAdd + accessAdd;
    let subtotal = pricePerTank * numTanks;
    let total = subtotal * (1 - discount);
    return Math.round(total);
  };

  const estimatedPrice = calculateEstimate();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-aqua-300 text-sm font-medium mb-6">
            <Droplets className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Simple, Fair Pricing</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            Professional tank cleaning starting from just {formatGHS(150)}. Final pricing confirmed after reviewing your requirements.
          </p>
        </div>
      </section>

      {/* Pricing Notice */}
      <section className="py-6 bg-aqua-50 border-b border-aqua-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-aqua-200">
            <Info className="w-5 h-5 text-aqua-600 flex-shrink-0 mt-0.5" />
            <p className="text-navy-700 text-sm">
              <strong>Prices shown are starting prices.</strong> Final pricing is confirmed after reviewing tank size, condition, accessibility, number of tanks and service location.
            </p>
          </div>
        </div>
      </section>

      {/* Residential Packages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-3 text-center">Residential Tank Cleaning</h2>
          <p className="text-navy-600 text-center mb-12 max-w-2xl mx-auto">Choose the service level that's right for your home.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Essential */}
            <div className="card-hover p-8 rounded-2xl bg-white border border-navy-200 shadow-sm">
              <div className="w-12 h-12 mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-1">Essential Tank Clean</h3>
              <p className="text-navy-500 text-sm mb-4">For small residential tanks</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-navy-900">From {formatGHS(150)}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Tank drainage', 'Sediment removal', 'Interior scrubbing', 'Rinsing', 'Basic visual inspection'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl border-2 border-navy-200 text-navy-800 font-semibold hover:bg-navy-50 transition-colors">
                Book Now
              </Link>
            </div>

            {/* Professional - Featured */}
            <div className="card-hover p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-800 border border-navy-700 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-aqua-500 text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="w-12 h-12 mb-4 rounded-xl bg-aqua-500/20 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Professional Tank Care</h3>
              <p className="text-navy-300 text-sm mb-4">Our standard residential service</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">From {formatGHS(250)}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Complete tank cleaning', 'Sediment and buildup removal', 'Interior scrubbing', 'Rinsing', 'Appropriate disinfection', 'Visual inspection', 'Basic service record', 'Recommended next service date'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-200">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-aqua-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                Book Now
              </Link>
            </div>

            {/* Premium */}
            <div className="card-hover p-8 rounded-2xl bg-white border border-navy-200 shadow-sm">
              <div className="w-12 h-12 mb-4 rounded-xl bg-amber-50 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-1">Premium Tank Care</h3>
              <p className="text-navy-500 text-sm mb-4">Comprehensive maintenance</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-navy-900">From {formatGHS(350)}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Everything in Professional Care', 'Detailed tank condition assessment', 'Cover inspection', 'Pipe/inlet/outlet inspection', 'Float valve visual inspection', 'Before-and-after photos', 'Detailed service report', 'Maintenance recommendations', 'Next-service reminder'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl border-2 border-navy-200 text-navy-800 font-semibold hover:bg-navy-50 transition-colors">
                Book Premium Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tank Size Pricing */}
      <section className="py-16 lg:py-20 bg-navy-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-3 text-center">Tank Size Pricing</h2>
          <p className="text-navy-600 text-center mb-8">Indicative starting prices based on tank capacity.</p>
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-navy-700">Tank Capacity</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-navy-700">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { range: '500–1,000 Litres', price: 150 },
                  { range: '1,500–2,000 Litres', price: 200 },
                  { range: '2,500–5,000 Litres', price: 300 },
                  { range: '5,000–10,000 Litres', price: 500 },
                  { range: '10,000 Litres+', price: null },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-navy-100">
                    <td className="px-6 py-4 text-sm text-navy-800 font-medium">{row.range}</td>
                    <td className="px-6 py-4 text-sm text-navy-900 font-bold text-right">
                      {row.price ? formatGHS(row.price) : 'Custom Quote'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Multiple Tank Discounts */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-3">Clean More. Save More.</h2>
          <p className="text-navy-600 mb-10">Multiple tanks? Enjoy discounted pricing.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { tanks: '2 Tanks', discount: '5% Discount', color: 'from-blue-500 to-blue-600' },
              { tanks: '3–5 Tanks', discount: '10% Discount', color: 'from-aqua-500 to-cyan-500' },
              { tanks: '6+ Tanks', discount: 'Custom Contract', color: 'from-navy-700 to-navy-800' },
            ].map((item, i) => (
              <div key={i} className="card-hover p-6 rounded-2xl bg-white border border-navy-100 shadow-sm">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">{item.tanks.split(' ')[0]}</span>
                </div>
                <h3 className="font-bold text-navy-900 mb-1">{item.tanks}</h3>
                <p className="text-aqua-600 font-semibold">{item.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-16 lg:py-20 bg-navy-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-50 border border-aqua-200 text-aqua-700 text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Price Estimator
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-3">Tank Cleaning Price Estimator</h2>
            <p className="text-navy-600">Get an instant estimate for your tank cleaning service.</p>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 shadow-lg overflow-hidden">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-navy-50/50 transition-colors"
            >
              <div>
                <h3 className="font-bold text-navy-900 text-lg">Calculate Your Estimate</h3>
                <p className="text-navy-500 text-sm">Select your requirements below</p>
              </div>
              {calcOpen ? <ChevronUp className="w-5 h-5 text-navy-400" /> : <ChevronDown className="w-5 h-5 text-navy-400" />}
            </button>

            {calcOpen && (
              <div className="p-6 pt-0 border-t border-navy-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Tank Capacity */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Tank Capacity</label>
                    <select
                      value={tankCapacity}
                      onChange={(e) => setTankCapacity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                    >
                      <option value="1000">500–1,000 Litres</option>
                      <option value="2000">1,500–2,000 Litres</option>
                      <option value="5000">2,500–5,000 Litres</option>
                      <option value="10000">5,000–10,000 Litres</option>
                      <option value="10000+">10,000+ Litres</option>
                    </select>
                  </div>

                  {/* Number of Tanks */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Number of Tanks</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setNumTanks(Math.max(1, numTanks - 1))} className="w-10 h-10 rounded-xl border border-navy-200 flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors font-bold">−</button>
                      <span className="text-2xl font-bold text-navy-900 w-12 text-center">{numTanks}</span>
                      <button onClick={() => setNumTanks(numTanks + 1)} className="w-10 h-10 rounded-xl border border-navy-200 flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors font-bold">+</button>
                    </div>
                  </div>

                  {/* Tank Condition */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Tank Condition</label>
                    <select
                      value={tankCondition}
                      onChange={(e) => setTankCondition(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                    >
                      <option value="good">Good condition</option>
                      <option value="moderate">Moderate sediment</option>
                      <option value="heavy">Heavy sediment/buildup</option>
                    </select>
                  </div>

                  {/* Accessibility */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Accessibility</label>
                    <select
                      value={accessibility}
                      onChange={(e) => setAccessibility(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                    >
                      <option value="easy">Easy access</option>
                      <option value="difficult">Difficult access</option>
                      <option value="rooftop">Rooftop/high-level access</option>
                    </select>
                  </div>

                  {/* Service Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Service Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: 'essential', label: 'Essential' },
                        { value: 'professional', label: 'Professional' },
                        { value: 'premium', label: 'Premium' },
                        { value: 'commercial', label: 'Commercial' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setServiceType(opt.value)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            serviceType === opt.value
                              ? 'bg-aqua-500 text-white shadow-lg shadow-aqua-500/25'
                              : 'bg-navy-50 text-navy-700 border border-navy-200 hover:bg-navy-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estimate Result */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 text-center">
                  <p className="text-navy-300 text-sm mb-2">Estimated Price</p>
                  <p className="text-4xl font-bold text-white mb-2">
                    {tankCapacity === '10000+' ? 'Custom Quote' : formatGHS(estimatedPrice)}
                  </p>
                  {getDiscount(numTanks) > 0 && (
                    <p className="text-aqua-400 text-sm font-medium">
                      Includes {Math.round(getDiscount(numTanks) * 100)}% multi-tank discount
                    </p>
                  )}
                  <p className="text-navy-400 text-xs mt-3">
                    This is an estimate only. Final pricing will be confirmed by our team after reviewing the service requirements.
                  </p>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-aqua-500 text-white rounded-xl font-semibold hover:bg-aqua-600 transition-colors"
                  >
                    Continue to Booking <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Charges */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-navy-50/50 border border-navy-100 hover:bg-navy-50 transition-colors"
          >
            <div className="text-left">
              <h2 className="text-xl font-bold text-navy-900">Possible Additional Charges</h2>
              <p className="text-navy-500 text-sm">Indicative charges for special requirements</p>
            </div>
            {showAdditional ? <ChevronUp className="w-5 h-5 text-navy-400" /> : <ChevronDown className="w-5 h-5 text-navy-400" />}
          </button>

          {showAdditional && (
            <div className="mt-4 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-navy-700">Requirement</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-navy-700">Starting Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { req: 'Heavy sediment/buildup', charge: '+GH₵50' },
                    { req: 'Difficult tank access', charge: '+GH₵50' },
                    { req: 'High-level/rooftop access', charge: '+GH₵50' },
                    { req: 'Additional tank', charge: 'Calculated automatically' },
                    { req: 'Long-distance travel', charge: 'Location-based quote' },
                    { req: 'Emergency/same-day service', charge: 'Premium quote' },
                    { req: 'Special equipment requirement', charge: 'Custom quote' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-navy-100">
                      <td className="px-6 py-3 text-sm text-navy-800">{row.req}</td>
                      <td className="px-6 py-3 text-sm text-navy-900 font-semibold text-right">{row.charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Commercial & Institutional */}
      <section className="py-16 lg:py-24 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-3 text-center">Commercial & Institutional Services</h2>
          <p className="text-navy-600 text-center mb-12 max-w-2xl mx-auto">Tailored solutions for businesses, hotels, schools, and large properties.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-hover p-8 rounded-2xl bg-white border border-navy-100 shadow-sm">
              <h3 className="text-xl font-bold text-navy-900 mb-2">Commercial Tank Cleaning</h3>
              <p className="text-2xl font-bold text-aqua-600 mb-4">From {formatGHS(500)}</p>
              <p className="text-navy-600 text-sm mb-4">Suitable for restaurants, offices, hotels, guesthouses, schools, churches, apartment buildings and commercial properties.</p>
              <ul className="space-y-2 mb-6">
                {['Tank cleaning', 'Sediment removal', 'Appropriate disinfection', 'Visual inspection', 'Service documentation', 'Multiple-tank scheduling'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors">
                Request Commercial Quote
              </Link>
            </div>

            <div className="card-hover p-8 rounded-2xl bg-white border border-navy-100 shadow-sm">
              <h3 className="text-xl font-bold text-navy-900 mb-2">Large Tank Service</h3>
              <p className="text-2xl font-bold text-navy-900 mb-4">Custom Quote</p>
              <p className="text-navy-600 text-sm mb-4">For tanks above 10,000 litres or complex installations. Please provide tank capacity, number of tanks, tank type, property type, location, accessibility and photos if available.</p>
              <ul className="space-y-2 mb-6">
                {['Custom assessment', 'Specialized equipment', 'Detailed planning', 'Flexible scheduling'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl border-2 border-navy-200 text-navy-800 font-semibold hover:bg-navy-50 transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Plans */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-3 text-center">Annual Tank Care Plans</h2>
          <p className="text-navy-600 text-center mb-12 max-w-2xl mx-auto">Scheduled maintenance throughout the year. Never miss a cleaning.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-hover p-8 rounded-2xl bg-white border border-navy-200 shadow-sm">
              <h3 className="text-xl font-bold text-navy-900 mb-1">Basic Annual Care</h3>
              <p className="text-navy-500 text-sm mb-4">Essential scheduled maintenance</p>
              <p className="text-2xl font-bold text-navy-900 mb-6">Custom Pricing</p>
              <ul className="space-y-2 mb-6">
                {['Scheduled tank cleaning', 'Routine visual inspection', 'Service history', 'Maintenance reminders'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl border-2 border-navy-200 text-navy-800 font-semibold hover:bg-navy-50 transition-colors">
                Request Annual Plan
              </Link>
            </div>

            <div className="card-hover p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-800 border border-navy-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-1">Professional Annual Care</h3>
              <p className="text-navy-300 text-sm mb-4">Comprehensive year-round service</p>
              <p className="text-2xl font-bold text-white mb-6">Custom Pricing</p>
              <ul className="space-y-2 mb-6">
                {['Multiple scheduled cleanings', 'Tank inspections', 'Service reports', 'Priority scheduling', 'Maintenance reminders', 'Discounted additional services'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-200">
                    <CheckCircle2 className="w-4 h-4 text-aqua-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-aqua-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                Request Annual Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management */}
      <section className="py-16 lg:py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Manage All Your Tanks With One Service</h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            For landlords and property managers with apartment buildings, estates, rental properties, commercial buildings, schools or hotels.
          </p>
          <p className="text-navy-300 text-sm mb-8">
            Pricing based on number of properties, number of tanks, tank capacities, cleaning frequency and service area.
          </p>
          <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-navy-50 transition-colors">
            Request Property Management Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
