import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Refs for sections
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  
  // Sample VLESS configuration
  const vlessConfig = `{
  "v": "2",
  "ps": "AHMED VPN - Tokyo",
  "add": "192.0.2.1",
  "port": "443",
  "id": "5c4a2b8d-1e90-4f3c-b3c0-1a5a3f7b9c0d",
  "aid": "0",
  "scy": "none",
  "net": "tcp",
  "type": "none",
  "host": "vpn.ahmed.com",
  "path": "/",
  "tls": "tls",
  "sni": "vpn.ahmed.com",
  "alpn": "http/1.1"
}`;

  // Intersection Observer for scroll-based section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [homeRef, featuresRef, howItWorksRef, pricingRef, faqRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const sections = {
      home: homeRef,
      features: featuresRef,
      how: howItWorksRef,
      pricing: pricingRef,
      faq: faqRef
    };
    
    if (sections[sectionId]?.current) {
      sections[sectionId].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  // Copy config to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(vlessConfig).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            AHMED VPN
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'features', 'how', 'pricing', 'faq'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-colors ${
                  activeSection === section 
                    ? 'text-indigo-500' 
                    : 'text-gray-300 hover:text-indigo-400'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get VLESS Config
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/90 backdrop-blur-md border-t border-gray-700">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {['home', 'features', 'how', 'pricing', 'faq'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize py-2 ${
                    activeSection === section 
                      ? 'text-indigo-500' 
                      : 'text-gray-300 hover:text-indigo-400'
                  }`}
                >
                  {section}
                </button>
              ))}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg mt-2"
              >
                Get VLESS Config
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        ref={homeRef}
        id="home"
        className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 container mx-auto"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Secure Your Connection
            </span>
            <br />
            with AHMED VPN
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Experience lightning-fast and secure internet access with our revolutionary VLESS protocol technology. Protect your privacy and access content anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => alert('This is a demo version. Actual functionality is not available.')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Download App
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300"
            >
              Get VLESS Config
            </button>
          </div>
          <div className="mt-12 flex justify-center">
            <img 
              src="https://picsum.photos/800/400"  
              alt="VPN Illustration" 
              className="rounded-xl shadow-2xl w-full max-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        id="features"
        className="py-16 px-4 bg-gray-800/30"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-indigo-500">AHMED</span> VPN?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Lightning Fast",
                description: "Enjoy ultra-fast connections with our optimized global network infrastructure.",
                icon: "⚡"
              },
              {
                title: "Military Grade Security",
                description: "Protect your data with AES-256 encryption and next-generation VLESS protocol.",
                icon: "🔒"
              },
              {
                title: "Global Coverage",
                description: "Connect to servers in over 50 countries with one click.",
                icon: "🌍"
              },
              {
                title: "Cross-Platform",
                description: "Use AHMED on all your devices - Android, iOS, Windows, Mac, and Linux.",
                icon: "📱"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        id="how"
        className="py-16 px-4 container mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It <span className="text-indigo-500">Works</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
            
            {/* Steps */}
            {[
              {
                number: "1",
                title: "Download & Install",
                description: "Get our app from the App Store, Google Play, or desktop platforms."
              },
              {
                number: "2",
                title: "Select Server",
                description: "Choose from our global network of high-speed servers in over 50 countries."
              },
              {
                number: "3",
                title: "Connect Securely",
                description: "Establish a secure connection with one click and browse anonymously."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className={`mb-16 relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}
              >
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg relative z-10 ml-12 md:ml-0">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={pricingRef}
        id="pricing"
        className="py-16 px-4 bg-gray-800/30"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pricing <span className="text-indigo-500">Plans</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
              <p className="text-gray-400 mb-4">Limited features for testing</p>
              <div className="text-4xl font-bold mb-6 text-indigo-500">FREE</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Limited bandwidth
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  1 device
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic security
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Limited servers
                </li>
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-4">Premium experience</p>
              <div className="text-4xl font-bold mb-6 text-indigo-500">$9.99/mo</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited bandwidth
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 devices
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced security
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All servers
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-4">For businesses and teams</p>
              <div className="text-4xl font-bold mb-6 text-indigo-500">$29.99/mo</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited bandwidth
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited devices
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom security
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All servers + dedicated
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integrations
                </li>
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our <span className="text-indigo-500">Users</span> Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Ali Mohamed",
              role: "Freelance Developer",
              avatar: "AM",
              quote: "I've tried many VPN services, but AHMED is by far the fastest and most reliable. The VLESS protocol makes a huge difference in performance!"
            },
            {
              name: "Sara Rahman",
              role: "Marketing Professional",
              avatar: "SR",
              quote: "The interface is clean and intuitive. Connecting to different servers is super easy, and I love how lightweight the app is on my phone."
            },
            {
              name: "Kamal Mehta",
              role: "Digital Nomad",
              avatar: "KM",
              quote: "As a frequent traveler, AHMED has been a lifesaver. I can access all my favorite content no matter where I am in the world."
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.544.917-4.01 3.587-4.01 5.512v3.87h5v8h-5.782l-1.218-1.218zm-8.983 0h5.782l1.218-1.218v-7.391c0-5.704-3.731-9.57-8.983-10.609l-.995 2.151c2.544.917 4.01 3.587 4.01 5.512v3.87h-5v8z"></path>
                </svg>
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqRef}
        id="faq"
        className="py-16 px-4 bg-gray-800/30"
      >
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="text-indigo-500">Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "What is VLESS protocol?",
                answer: "VLESS is a lightweight, secure, and multiplexing proxy protocol designed for high-performance scenarios. It's known for its efficiency and low latency, making it perfect for modern internet usage."
              },
              {
                question: "Is AHMED VPN free to use?",
                answer: "We offer a free trial version with limited features, but our full-featured premium plans provide the best experience with unlimited bandwidth and advanced security features."
              },
              {
                question: "How many devices can I use with one account?",
                answer: "Our free plan allows one device, while the Pro plan supports up to 5 devices simultaneously. Enterprise plans offer unlimited device connections."
              },
              {
                question: "Does AHMED keep logs of my activity?",
                answer: "Absolutely not! We have a strict no-logs policy. Your online activities, browsing history, and personal information are never recorded or stored."
              },
              {
                question: "What platforms does AHMED support?",
                answer: "AHMED works on all major platforms including Windows, macOS, Linux, Android, and iOS. We also provide browser extensions for Chrome and Firefox."
              },
              {
                question: "How do I get VLESS configuration files?",
                answer: "You can easily generate VLESS configuration files through our app or website once you've subscribed to one of our plans. The configurations can be imported into compatible clients like Xray or V2Ray."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
                AHMED VPN
              </h3>
              <p className="text-gray-400">
                Secure your internet connection with our advanced VLESS protocol technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Features', 'How It Works', 'Pricing', 'FAQ'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map((policy) => (
                  <li key={policy}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                      {policy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors"
                    aria-label={social}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'Twitter' && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195c-1.05-.925-2.352-1.506-3.796-1.506-3.179 0-5.515 2.966-4.797 6.045A13.998 13.998 0 011.64 3.162a4.822 4.822 0 001.526 6.438c-.836-.026-1.633-.259-2.35-.65 0 1.225.827 2.275 1.948 2.53a4.92 4.92 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                      )}
                      {social === 'LinkedIn' && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      )}
                      {social === 'Facebook' && (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      )}
                      {social === 'Instagram' && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2023 AHMED VPN. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* VLESS Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">VLESS Configuration</h2>
            <p className="text-gray-400 mb-4">Copy the configuration below to use with your VLESS client:</p>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              {vlessConfig}
            </pre>
            <button 
              onClick={copyToClipboard}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Configuration'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
