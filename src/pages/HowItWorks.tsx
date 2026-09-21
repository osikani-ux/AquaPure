import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Phone, Truck, Shield } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      icon: CalendarCheck,
      title: 'Book',
      desc: 'Choose your preferred service and submit your details through our booking form, phone, or WhatsApp.',
      details: ['Select service type', 'Provide property details', 'Choose preferred date & time', 'Submit your request']
    },
    {
      num: '02',
      icon: Phone,
      title: 'We Confirm',
      desc: 'Our team contacts you to confirm the appointment, discuss requirements, and provide a final price quote.',
      details: ['Review your requirements', 'Confirm pricing', 'Schedule the appointment', 'Send confirmation']
    },
    {
      num: '03',
      icon: Truck,
      title: 'We Clean',
      desc: 'Our trained technicians arrive at your property with professional equipment and perform the service.',
      details: ['Arrive at scheduled time', 'Professional cleaning', 'Visual inspection', 'Documentation']
    },
    {
      num: '04',
      icon: Shield,
      title: 'Stay Protected',
      desc: 'Receive your service record and reminder for your next maintenance. Your tank is clean and documented.',
      details: ['Service report', 'Next service date', 'Maintenance recommendations', 'Reminder scheduling']
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            Getting your water tank professionally cleaned is simple. Here's our straightforward process.
          </p>
        </div>
      </section>

      {/* Steps - Desktop Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-aqua-500 via-cyan-500 to-clean-500 rounded-full"></div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-aqua-500/30 relative z-10">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-navy-50 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-aqua-600" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-navy-600 text-sm mb-4 leading-relaxed">{step.desc}</p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, j) => (
                      <li key={j} className="text-navy-500 text-xs flex items-center gap-1 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-aqua-400"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-6">
                {/* Timeline Line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-aqua-500 to-cyan-500"></div>
                )}

                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-aqua-500/30">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-aqua-600" />
                    <h3 className="text-xl font-bold text-navy-900">{step.title}</h3>
                  </div>
                  <p className="text-navy-600 text-sm mb-3 leading-relaxed">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((detail, j) => (
                      <li key={j} className="text-navy-500 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-aqua-400"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 lg:py-20 bg-navy-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Our team arrives at the scheduled time',
              'We assess the tank before starting',
              'Professional equipment is used throughout',
              'We minimize water wastage',
              'The area is left clean after service',
              'You receive a service record',
              'We recommend your next service date',
              'Follow-up support is available',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-100 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-aqua-50 flex items-center justify-center text-aqua-600 font-bold text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-navy-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-navy-200 mb-8">It only takes a few minutes to schedule your tank cleaning.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-navy-50 transition-colors">
              Book a Cleaning <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
