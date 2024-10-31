import React, {useState} from 'react'
import { Calendar, Users, Layout, Box, Clock, Download, Brain, ProjectorIcon, Pencil, ChevronDown, Menu, X, Instagram, Linkedin } from 'lucide-react'
import demoVid from "../../src/assets/demo-video.mp4"
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false) 
  
  return (
    <nav className="bg-white fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8" /> */}
            <span className="ml-2 text-2xl md:text-3xl font-semibold">Boolean<span className='text-[#6a7cff]'>AI</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#team" className="text-gray-600 hover:text-gray-900">Team</a>
            <button className="ml-4 px-4 py-2 rounded-md bg-[#6a7cff] text-white ">
              Sign Up Free
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-600">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-600">Pricing</a>
            <a href="#team" className="block px-3 py-2 text-gray-600">Team</a>
            <button className="w-full mt-2 px-4 py-2 rounded-md bg-blue-600 text-white">
              Sign Up Free
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

const Hero = () => (
  <div className="pt-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-[#060a2c] sm:text-5xl md:text-6xl">
          AI Digital Electronics Question Solver
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Draw Questions on Whiteboard or Upload an Image for Logic Gates | Code Conversions (BCD to Excess 3, etc) | K-Map | Binary Arithmetic | Boolean Algebra etc
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link to="/booleanai">
            <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6a7cff] hover:bg-[#3b4dd8] md:py-4 md:text-lg md:px-10 shadow-custom-shadow transition-all duration-200 ease-in-out">
              Start Solving For Free
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-lg shadow-xl overflow-hidden">
        <p className='text-center text-gray-400'>Video Demo</p>
        <video alt='video-demo' controls src={demoVid} className='w-full' autoPlay>
     </video>
      </div>
    </div>
  </div>
)

const Feature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const Features = () => (
  <section id="features" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for BooleanAI</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Feature
          icon={Users}
          title="Real-time Collaboration"
          description="Work together with your team in real-time, no matter where you are."
        />
        <Feature
          icon={Layout}
          title="Infinite Canvas"
          description="Never run out of space - our infinite canvas grows with your ideas."
        />
        <Feature
          icon={Box}
          title="Smart Shapes"
          description="Create perfect shapes instantly with our intelligent shape recognition."
        />
        <Feature
          icon={Calendar}
          title="Template Library"
          description="Get started quickly with our extensive library of templates."
        />
        <Feature
          icon={Clock}
          title="Version History"
          description="Track changes and revert to previous versions with ease."
        />
        <Feature
          icon={Download}
          title="Export Options"
          description="Export your work in various formats for easy sharing and presentation."
        />
      </div>
    </div>
  </section>
)

const UseCase = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const UseCases = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Use Cases for Our Whiteboard Tool</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UseCase
          icon={Brain}
          title="Brainstorming Sessions"
          description="Capture and organize ideas collaboratively in real-time."
        />
        <UseCase
          icon={ProjectorIcon}
          title="Remote Teaching"
          description="Create engaging online lessons and visual explanations."
        />
        <UseCase
          icon={Pencil}
          title="UX/UI Design"
          description="Sketch wireframes and prototypes quickly and efficiently."
        />
      </div>
    </div>
  </section>
)

const OpenSource = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Open Source</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Our whiteboard tool is open source. We believe in the power of collaboration and community-driven development.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          View on GitHub
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
          Read Documentation
        </button>
      </div>
    </div>
  </section>
)

const PricingTier = ({ title, price, features, isPopular }) => (
  <div className={`p-8 bg-white rounded-lg shadow-md ${isPopular ? 'ring-2 ring-blue-600' : ''}`}>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">₹{price}</span>
      <span className="text-gray-600">/month</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-md ${isPopular ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}>
      {isPopular ? 'Get Started' : 'Coming Soon'}
    </button>
  </div>
)

const Pricing = () => (
  <section id="pricing" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PricingTier
          title="Free"
          price="0"
          features={[
            'Unlimited boards',
            'Basic shapes',
            'Core features'
          ]}
          isPopular
        />
        <PricingTier
          title="Pro"
          price="149"
          features={[
            'Everything in Free',
            'Advanced features',
            'Priority support'
          ]}
          
        />
      </div>
    </div>
  </section>
)

const TeamMember = ({ name, role, image }) => (
  <div className="text-center">
    <div className="w-32 h-32 mx-auto mb-4">
      <img src={image} alt={name} className="w-full h-full rounded-full bg-purple-600" />
    </div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
)

const Team = () => (
  <section id="team" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
        <TeamMember
          name="John Doe"
          role="Product Lead"
          image="/placeholder.svg?height=128&width=128"
        />
        <TeamMember
          name="Jane Smith"
          role="Lead Developer"
          image="/placeholder.svg?height=128&width=128"
        />
       
      </div>
    </div>
  </section>
)

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className="mt-2 text-gray-600">
            <p>{answer}</p>
          </div>
        )}
      </div>
    )
  }
  
  const FAQ = () => {
    const faqs = [
      {
        question: "Is the whiteboard tool really free?",
        answer: "Yes! Our core features are completely free and will always be. We offer a Pro plan for advanced features and priority support."
      },
      {
        question: "How many team members can I add?",
        answer: "You can add unlimited team members to collaborate on your whiteboards in real-time, even on our free plan."
      },
      {
        question: "Can I integrate with other tools?",
        answer: "Yes, we support integration with popular tools through our API. This feature is available on our Pro plan."
      },
      {
        question: "Is my data secure?",
        answer: "We take data security  very seriously. All your data is encrypted in transit and at rest. We also offer regular backups and have strict access controls in place."
      },
      {
        question: "Do you offer custom enterprise solutions?",
        answer: "We offer tailored enterprise solutions with custom features, dedicated support, and on-premise options. Contact our sales team for more information."
      }
    ]
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    )
  }
const Footer = () => (
  <footer className="bg-[#060a2c] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row w-full justify-between md:px-16 gap-14">
        <div className="booleanai">
          <div className="onlyElement">
          <h2 className='text-4xl font-extrabold text-white'>BooleanAI</h2>
            <p className='my-2 text-gray-300'>Smoother than your cheesecake</p>
            <div className="social-list flex gap-4">
            <Instagram size={20} />
            <Linkedin size={20}/>
            </div>
          </div>
        </div>
      <div className='flex flex-col md:flex-row gap-8 md:gap-12'>
        <div className='1st element'>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
            <li><a href="#" className="text-gray-400  hover:text-white">Sponsor</a></li>
            <li><a href="#" className="text-gray-400  hover:text-white">About Us</a></li>
          </ul>
        </div>
        <div className='2nd element'>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Sponsor</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
          </ul>
        </div>
      </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2024 BooleanAI. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <OpenSource />
      <Pricing />
      <Team />
      <FAQ />
      <Footer />
    </div>
  )
}