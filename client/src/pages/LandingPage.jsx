import React, {useState} from 'react'
import { ScanText, Calendar, Users, Layout, Box, Clock, Download, Brain, ProjectorIcon, Pencil, ChevronDown, Menu, X, Instagram, Linkedin, ImageUp, ShieldCheck, Database } from 'lucide-react'
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
        Draw Questions on Whiteboard or Upload an Image to solve Digital Electronics Questions for Logic Gates | Code Conversions (BCD to Excess 3, etc) | K-Map | Binary Arithmetic | Boolean Algebra etc
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link to="/booleanai">
            <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6a7cff] hover:bg-[#3b4dd8] md:py-4 md:text-lg md:px-10  transition-all duration-200 ease-in-out">
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
    <div className="w-12 h-12 bg-[#e8f2ff] rounded-lg flex items-center justify-center text-[#6a7cff] mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>  
  </div>
)

const Features = () => (
  <section id="features" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Powerful Features of BooleanAI</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Feature
          icon={ScanText}
          title="Whiteboard Handwriting Recognition"
          description="Work together with your team in real-time, no matter where you are."
        />
        <Feature
          icon={ImageUp}
          title="Question Image Upload"
          description="Never run out of space - our infinite canvas grows with your ideas."
        />
        <Feature
          icon={Box}
          title="Clean Minimalist Design"
          description="Create perfect shapes instantly with our intelligent shape recognition."
        />
        <Feature
          icon={ShieldCheck}
          title="Increased Accuracy"
          description="Get started quickly with our extensive library of templates."
        />
        <Feature
          icon={Database}
          title="Langchain Integration"
          description="Give Follow Ups to the question provided, Coming Soon."
        />
        <Feature
          icon={Download}
          title="Export & Save Solutions"
          description="Export your work in various formats for easy sharing and presentation."
        />
      </div>
    </div>
  </section>
)

// const UseCase = ({ icon: Icon, title, description }) => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
//       <Icon size={24} />
//     </div>
//     <h3 className="text-lg font-semibold mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// )

// const UseCases = () => (
//   <section className="py-20 bg-white">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-center mb-12">Use Cases for Our Whiteboard Tool</h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <UseCase
//           icon={Brain}
//           title="Brainstorming Sessions"
//           description="Capture and organize ideas collaboratively in real-time."
//         />
//         <UseCase
//           icon={ProjectorIcon}
//           title="Remote Teaching"
//           description="Create engaging online lessons and visual explanations."
//         />
//         <UseCase
//           icon={Pencil}
//           title="UX/UI Design"
//           description="Sketch wireframes and prototypes quickly and efficiently."
//         />
//       </div>
//     </div>
//   </section>
// )

const OpenSource = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Open Source Community Driven</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
        Our plateform is open source. As we are big time open-source fans because of its collaborative nature and growth-for-all
        persona. We built BooleanAI a community of folks just like us because we wanted to give something back to place we have
        learnt so much from.
      </p>
      <p className="text-gray-600 my-4 mb-8 max-w-2xl mx-auto text-lg">
        You can be a part of this journey by helping us improve BooleanAI for thousands of people around the world.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-[#6a7cff] text-white rounded-md hover:bg-blue-700">
          Contribute [GT]
        </button>
        <button className="px-3 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
          Star us on GitHub
        </button>
      </div>
    </div>
  </section>
)
const SponsorUs = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Sponsor Us</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
        Your support will help this project grow and impact thousands of lives.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-[#6a7cff] text-white rounded-md hover:bg-blue-700">
          Buy me a coffee
        </button>
        <button className="px-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
          Sponsor Us (RazorPay)
        </button>
      </div>
    </div>
  </section>
)

const PricingTier = ({ title, price, features, isPopular }) => (
  <div className={`p-8 bg-white rounded-lg shadow-md ${isPopular ? 'ring-2 ring-[#6a7cff]' : ''}`}>
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
    <button className={`w-full py-3 rounded-md ${isPopular ? 'bg-[#6a7cff] text-white' : 'border border-gray-300'}`}>
      {isPopular ? 'Get Started' : 'Coming Soon'}
    </button>
  </div>
)

const Pricing = () => (
  <section id="pricing" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Completely Free till Now</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PricingTier
          title="Free"
          price="0"
          features={[
            'Well working Model',
            'More than 85% Accuracy',
            'High Rate Limits',
            'All Core features',
          ]}
          isPopular
        />
        <PricingTier
          title="Pro"
          price="1XX"
          features={[
            'Select your own Model',
            'Priority support',
            'Low Rate Limits',
            'Advanced features',
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
      <h2 className="text-4xl font-bold text-center mb-12">Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
        <TeamMember
          name="Adnan Khan"
          role="Creator, Developer"
          image="/placeholder.svg?height=128&width=128"
        />
        <TeamMember
          name="Garv Thakre"
          role="Developer"
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
        question: "How do i use BooleanAI?",
        answer: "Simply click 'Start Solving for Free' Now sketch your question or diagrams. You can upload photos of handwritten problems for quick solutions."
      },
      {
        question: "Is the BooleanAI really free?",
        answer: "Yes! Our core features are completely free now. We will offer a Pro plan for advanced features and priority support."
      },
      {
        question: "Do I need an account to get started?",
        answer: "No account is needed to try our basic feautres, but creating one lets you save and revisit saved questions."
      },
      {
        question: "Can I Solve all levels of Digital Electronics Questions?",
        answer: "Currently it supports basic to intermediate questions of binary arithmetic, boolean algebra, logic gates, K-Map and Code Conversions."
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
            <div className="campusx-branding border-t border-gray-800 flex gap-4 mt-4 pt-2">
            <p className='text-gray-300'>Also Try</p>
            <a href="#" className="text-gray-400 hover:text-white">CampusX</a>
            <a href="#" className="text-gray-400 hover:text-white">CampusAI</a>
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
        <p>&copy; 2024 Adnan Khan. All rights reserved.</p>
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
      <OpenSource />
      <SponsorUs />
      <Pricing />
      <Team />
      <FAQ />
      <Footer />
    </div>
  )
}