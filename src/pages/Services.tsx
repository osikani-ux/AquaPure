import { Link } from 'react-router-dom';
import { Sparkles, Shield, CheckCircle2, CalendarCheck, Building2, Briefcase, ArrowRight, Droplets } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Sparkles,
      title: 'Tank Cleaning',
      desc: 'Professional cleaning to remove dirt, sediment and buildup from your water storage tank. Our team uses proper techniques and equipment to thoroughly clean the interior surfaces.',
      features: ['Tank drainage', 'Sediment removal', 'Interior scrubbing', 'Rinsing']
    },
    {
      icon: Shield,
      title: 'Tank Disinfection',
      desc: 'Cleaning and appropriate disinfection procedures for water-storage systems. We apply suitable disinfection methods to help maintain water-storage hygiene.',
      features: ['Full cleaning', 'Appropriate disinfection', 'Contact time management', 'Rinsing']
    },
    {
      icon: CheckCircle2,
      title: 'Tank Inspection',
      desc: 'Visual inspection of the tank, cover, pipes, valves and visible components. We identify any visible issues and document the condition of your tank.',
      features: ['Interior condition', 'Cover inspection', 'Pipe & valve check', 'Documentation']
    },
    {
      icon: CalendarCheck,
      title: 'Tank Maintenance',
      desc: 'Identify visible maintenance issues and recommend corrective action. We help you stay on top of your water storage maintenance needs.',
      features: ['Issue identification', 'Recommendations', 'Maintenance planning', 'Follow-up scheduling']
    },
    {
      icon: Building2,
      title: 'Commercial Tank Cleaning',
      desc: 'Scheduled cleaning services for businesses, institutions and large properties. We work around your schedule to minimize disruption.',
      features: ['Flexible scheduling', 'Multiple tanks', 'Service documentation', 'Recurring plans']
    },
    {
      icon: Briefcase,
      title: 'Property Tank Management',
      desc: 'Recurring cleaning and maintenance plans for landlords and property managers. Manage all your tanks with one service provider.',
      features: ['Multiple properties', 'Scheduled cleaning', 'Consistent records', 'Priority scheduling']
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-aqua-300 text-sm font-medium mb-6">
            <Droplets className="w-4 h-4" />
            Our Services
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Professional Tank Services</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            Comprehensive water tank cleaning, disinfection, inspection and maintenance solutions for every property type.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="card-hover p-8 rounded-2xl bg-white border border-navy-100 shadow-sm">
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-aqua-500/20">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="w-4 h-4 text-clean-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="inline-flex items-center gap-1 text-aqua-600 font-semibold text-sm hover:text-aqua-700 transition-colors">
                  Book This Service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Documentation */}
      <section className="py-16 lg:py-24 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Every Service Is Documented</h2>
            <p className="text-navy-600 text-lg mb-8">
              After every service, you receive a basic service record containing important information about your tank and the work performed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Service date', 'Tank size', 'Cleaning performed', 'Visible tank condition', 'Maintenance observations', 'Recommended next service date'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-aqua-500 flex-shrink-0" />
                  <span className="text-navy-800 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How often should I clean my water tank?', a: 'The appropriate frequency depends on tank condition, water source, usage and local circumstances. We recommend regular inspection and cleaning when needed. Many customers schedule cleaning every 6 months.' },
              { q: 'How long does cleaning take?', a: 'Duration depends on tank size, condition and accessibility. A standard residential tank typically takes 1-3 hours. Larger or heavily sedimented tanks may take longer.' },
              { q: 'Do you clean rooftop tanks?', a: 'Yes, subject to safe access and appropriate working conditions. Additional charges may apply for difficult or high-level access.' },
              { q: 'Do you service commercial properties?', a: 'Yes. We provide services for restaurants, offices, hotels, schools, churches, apartment buildings and other commercial properties.' },
              { q: 'Do you provide recurring maintenance?', a: 'Yes. We offer scheduled maintenance plans including annual care plans and property management plans for landlords.' },
              { q: 'Can you clean multiple tanks?', a: 'Yes. We offer discounts for multiple tanks. The more tanks you have cleaned, the more you save.' },
              { q: 'Do you repair damaged tanks?', a: 'We can identify visible issues during inspection and recommend or coordinate appropriate repairs. Our primary focus is cleaning and maintenance.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-navy-50/50 border border-navy-100">
                <h3 className="font-bold text-navy-900 mb-2">{faq.q}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-navy-200 mb-8">Book your professional tank cleaning today.</p>
          <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-navy-50 transition-colors">
            Book a Cleaning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
