import React, { useState } from 'react';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  Users,
  LayoutDashboard,
  Settings,
  Bell
} from 'lucide-react';

// --- Shared Constants & Branding ---
const BRAND = {
  colors: {
    gold: '#D4AF37',
    goldHover: '#B5952F',
    beige: '#FAF8F5',
    dark: '#1A1A1A',
    textMuted: '#666666'
  }
};

// --- Mock Data ---
const SERVICES = [
  { id: 1, title: 'Hair Styling & Care', icon: Scissors, desc: 'Precision cuts, coloring, and luxurious keratin treatments.' },
  { id: 2, title: 'Advanced Skin Care', icon: Sparkles, desc: 'Rejuvenating facials, hydrafacials, and glowing skin therapies.' },
  { id: 3, title: 'Bridal & Party Makeup', icon: CheckCircle, desc: 'Flawless HD and Airbrush makeup for your special day.' },
  { id: 4, title: 'Nail Art & Extensions', icon: Sparkles, desc: 'Acrylics, gel polish, and intricate custom nail designs.' },
  { id: 5, title: 'Professional Academy', icon: Users, desc: 'Master the art of beauty with our certified training courses.' },
];

const PRICING = [
  { service: 'Advanced Haircut & Styling', price: '₹999+' },
  { service: 'Global Hair Color', price: '₹3,999+' },
  { service: 'Signature HydraFacial', price: '₹2,499+' },
  { service: 'Bridal HD Makeup', price: '₹14,999+' },
  { service: 'Gel Nail Extensions', price: '₹1,499+' },
  { service: 'Professional Makeup Course', price: '₹45,000' },
];

const MOCK_APPOINTMENTS = [
  { id: 'APT-001', client: 'Priya Sharma', service: 'Bridal HD Makeup', date: '2026-02-25', time: '10:00 AM', status: 'Confirmed' },
  { id: 'APT-002', client: 'Rahul Singh', service: 'Advanced Haircut', date: '2026-02-25', time: '01:30 PM', status: 'Pending' },
  { id: 'APT-003', client: 'Ananya Patel', service: 'Signature HydraFacial', date: '2026-02-26', time: '11:00 AM', status: 'Confirmed' },
  { id: 'APT-004', client: 'Sneha Gupta', service: 'Gel Nail Extensions', date: '2026-02-26', time: '04:00 PM', status: 'Completed' },
  { id: 'APT-005', client: 'Karan Verma', service: 'Hair Color & Spa', date: '2026-02-27', time: '12:00 PM', status: 'Pending' },
];

// --- Main Application Component ---
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'book', 'admin'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
      {/* Navigation */}
      {currentView !== 'admin' && (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => navigateTo('home')}
              >
                <div className="text-2xl tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                  <span className="font-bold text-gray-900">London</span> House
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => navigateTo('home')} className="text-sm font-medium hover:text-[#D4AF37] transition-colors uppercase tracking-wide">Home</button>
                <a href="#services" onClick={(e) => { if(currentView !== 'home') { e.preventDefault(); navigateTo('home'); } }} className="text-sm font-medium hover:text-[#D4AF37] transition-colors uppercase tracking-wide">Services</a>
                <button onClick={() => navigateTo('admin')} className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wide">Admin</button>
                <button
                  onClick={() => navigateTo('book')}
                  className="px-6 py-2.5 text-sm font-medium text-white transition-colors uppercase tracking-wide rounded-sm"
                  style={{ backgroundColor: BRAND.colors.gold }}
                  onMouseOver={(e) => e.target.style.backgroundColor = BRAND.colors.goldHover}
                  onMouseOut={(e) => e.target.style.backgroundColor = BRAND.colors.gold}
                >
                  Book Appointment
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0">
              <div className="px-4 pt-2 pb-4 space-y-1 shadow-lg">
                <button onClick={() => navigateTo('home')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50">Home</button>
                <button onClick={() => navigateTo('admin')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50">Admin Login</button>
                <button onClick={() => navigateTo('book')} className="block w-full text-left px-3 py-2 text-base font-medium text-[#D4AF37] hover:bg-gray-50">Book Appointment</button>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentView === 'book' && <BookingView />}
        {currentView === 'admin' && <AdminView navigateTo={navigateTo} />}
      </main>

      {/* Footer */}
      {currentView !== 'admin' && (
        <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="text-2xl tracking-widest uppercase mb-6" style={{ fontFamily: 'serif' }}>
                  <span className="font-bold">London</span> House
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Gorakhpur's premier destination for luxury hair, skin, and makeup services. Elevating beauty standards through professional expertise and world-class products.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors"><Facebook size={20} /></a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif mb-6 uppercase tracking-wider text-[#D4AF37]">Contact Us</h3>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="flex items-start">
                    <MapPin size={18} className="mr-3 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>1st Floor, City Center Mall Road,<br/>Medical College Road,<br/>Gorakhpur, UP 273004</span>
                  </li>
                  <li className="flex items-center">
                    <Phone size={18} className="mr-3 text-[#D4AF37] flex-shrink-0" />
                    <span>+91 98765 43210</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-serif mb-6 uppercase tracking-wider text-[#D4AF37]">Hours</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex justify-between border-b border-gray-800 pb-2">
                    <span>Monday - Saturday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span>Sunday</span>
                    <span>11:00 AM - 7:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} London House Salon & Academy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// --- Home View ---
function HomeView({ navigateTo }) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Salon Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm mb-4 block">Welcome to Gorakhpur's Finest</span>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
              Luxury Hair & <br />Beauty Experience
            </h1>
            <p className="text-lg text-gray-200 mb-10 font-light max-w-lg">
              Indulge in premium salon services and world-class beauty education at London House. Where elegance meets expertise.
            </p>
            <button
              onClick={() => navigateTo('book')}
              className="px-8 py-4 text-sm font-medium text-white transition-all uppercase tracking-widest rounded-sm hover:-translate-y-1"
              style={{ backgroundColor: BRAND.colors.gold }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24" style={{ backgroundColor: BRAND.colors.beige }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>Our Premium Services</h2>
            <div className="w-16 h-0.5 mx-auto bg-[#D4AF37]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF8F5] mb-6 text-[#D4AF37]">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <button onClick={() => navigateTo('book')} className="text-sm font-semibold text-[#D4AF37] flex items-center hover:text-[#B5952F] transition-colors">
                  Book Now <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>Service Menu</h2>
            <p className="text-gray-500">Transparent pricing for premium quality.</p>
            <div className="w-16 h-0.5 mx-auto bg-[#D4AF37] mt-6"></div>
          </div>

          <div className="space-y-4">
            {PRICING.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-4 border-b border-dashed border-gray-200 hover:bg-gray-50 px-4 transition-colors">
                <span className="text-gray-800 font-medium">{item.service}</span>
                <span className="text-[#D4AF37] font-semibold">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('book')}
              className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              View All & Book
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Booking View ---
function BookingView() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock Calendar Data Generation
  const daysInMonth = 28; // simplifying for UI mockup
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedService && selectedDate && selectedTime) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF8F5] px-4 py-12">
        <div className="bg-white p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing London House. Your appointment request for <strong>{selectedService}</strong> on <strong>Feb {selectedDate} at {selectedTime}</strong> has been sent. Our team will call you shortly to confirm.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 text-sm font-medium text-white uppercase tracking-widest"
            style={{ backgroundColor: BRAND.colors.gold }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>Book Your Visit</h1>
          <p className="text-gray-500">Select a service, date, and time to request an appointment.</p>
        </div>

        <div className="bg-white shadow-xl shadow-gray-200/40 rounded-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12">

            {/* 1. Select Service */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">1. Select Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-sm bg-gray-50 text-gray-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none"
                required
              >
                <option value="" disabled>Choose a service category...</option>
                <option value="Haircut & Styling">Haircut & Styling</option>
                <option value="Hair Color & Treatments">Hair Color & Treatments</option>
                <option value="Bridal Makeup">Bridal Makeup</option>
                <option value="Party Makeup">Party Makeup</option>
                <option value="Facials & Skincare">Facials & Skincare</option>
                <option value="Nail Art & Extensions">Nail Art & Extensions</option>
                <option value="Academy Consultation">Academy Consultation</option>
              </select>
            </div>

            {/* 2. Select Date */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                2. Choose Date <span className="ml-2 text-gray-400 font-normal normal-case">(Feb 2026)</span>
              </label>
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['S','M','T','W','T','F','S'].map((d, index) => <div key={`day-${index}`} className="text-xs text-gray-400 font-medium py-2">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for visual alignment of 1st day */}
                <div></div><div></div><div></div>
                {dates.map(date => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square flex items-center justify-center text-sm rounded-sm transition-all
                      ${selectedDate === date
                        ? 'bg-[#D4AF37] text-white font-bold'
                        : 'bg-gray-50 text-gray-700 hover:border-[#D4AF37] border border-transparent'
                      }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Select Time */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">3. Choose Time</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                    className={`py-3 px-4 text-sm rounded-sm transition-all border
                      ${!selectedDate ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400' :
                        selectedTime === time
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-[#D4AF37] bg-white'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={!selectedService || !selectedDate || !selectedTime}
                className="w-full py-4 text-sm font-bold text-white uppercase tracking-widest transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: BRAND.colors.gold }}
              >
                Request Appointment
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                No payment required at booking. You will pay at the salon.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- Admin Dashboard View ---
function AdminView({ navigateTo }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">

      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1A1A] text-gray-300 flex-shrink-0 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="text-xl tracking-widest uppercase text-white" style={{ fontFamily: 'serif' }}>
            London <span className="font-normal text-[#D4AF37]">Admin</span>
          </div>
          <button onClick={() => navigateTo('home')} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-6 py-3 bg-[#D4AF37]/10 text-[#D4AF37] border-r-4 border-[#D4AF37]">
                <Calendar size={18} className="mr-3" /> Appointments
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-800 hover:text-white transition-colors">
                <Users size={18} className="mr-3" /> Clients
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-800 hover:text-white transition-colors">
                <LayoutDashboard size={18} className="mr-3" /> Services
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-800 hover:text-white transition-colors">
                <Settings size={18} className="mr-3" /> Settings
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button onClick={() => navigateTo('home')} className="text-sm flex items-center text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={16} className="mr-1 rotate-180" /> Back to Website
          </button>
        </div>
      </aside>

      {/* Admin Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-[#D4AF37] relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-[#D4AF37] flex items-center justify-center text-sm font-bold text-gray-600">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Today</div>
              <div className="text-3xl font-bold text-gray-900">12</div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">Pending Confirmation</div>
              <div className="text-3xl font-bold text-yellow-600">4</div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">Revenue Today (Est)</div>
              <div className="text-3xl font-bold text-gray-900">₹24,500</div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Appointment List</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_APPOINTMENTS.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apt.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{apt.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apt.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{apt.date}</div>
                        <div className="text-xs text-gray-500">{apt.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#D4AF37] hover:text-[#B5952F] mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 border border-gray-300 rounded-sm text-sm text-gray-600 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
