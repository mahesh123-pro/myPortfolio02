export const projectData = {
  "manakrishi": {
    id: "manakrishi",
    title: "Manakrishi App",
    tagline: "Precision Drone Spraying & IoT Agriculture",
    description: "A precision drone spraying platform and mobile app that empowers farmers with real-time crop health monitoring, reducing manual spraying health risks and pesticide waste through smart IoT integration.",
    role: "Full-Stack + Mobile Dev",
    stack: ["React Native", "Node.js", "MongoDB"],
    hardware: "Drone IoT Integration",
    image: "/portfolio1assests/work-1.png",
    liveLink: "https://www.manakrishi.in/",
    githubLink: "#",
    metrics: [
      "100% health safety ensured for field workers vs traditional manual spraying",
      "Measurable reduction in pesticide waste and associated costs",
      "Actively serving test users in target rural regions",
      "Real-time WebSocket latency under 200ms for live telemetry"
    ],
    features: [
      "Precision drone spraying scheduling via mobile app",
      "Real-time crop health monitoring with live telemetry",
      "Multi-language support designed for rural farmers",
      "Historical yield analysis and seasonal crop reports"
    ],
    architecture: "The React Native mobile application sends REST API requests to a Node.js / Express backend hosted on AWS. Real-time drone telemetry data is streamed directly to the app via WebSocket connections (Socket.io), ensuring sub-second status updates.",
    challenge: "Integrating real-time drone telemetry with low-latency updates for farmers in rural areas with limited connectivity.",
    solution: "Transitioned from standard HTTP polling to persistent WebSocket connections, enabling immediate status delivery and reducing unnecessary API round-trips by over 80%."
  },
  "prolance": {
    id: "prolance",
    title: "Prolance",
    tagline: "Professional Networking & Growth Platform",
    description: "Professional networking platform built to help users create meaningful connections and growth opportunities through personalized matching and collaborative workspaces.",
    role: "Frontend Architect",
    stack: ["Next.js", "Node.js", "MongoDB"],
    hardware: "N/A",
    image: "/portfolio1assests/prolance.png",
    liveLink: "https://www.prolance.me/",
    githubLink: "#",
    metrics: [
      "100+ active connections made within first month of testing",
      "40% faster user matching using optimized search algorithms",
      "99.9% uptime for professional networking services"
    ],
    features: [
      "Real-time professional connectivity dashboard",
      "AI-driven skill matching for collaborative projects",
      "Integrated job board and growth tracking",
      "Personalized profile builder and spotlight features"
    ],
    architecture: "Built with Next.js for server-side rendering, ensuring SEO optimization and high performance. The backend is a Node.js microservices architecture that handles real-time notifications and professional matching.",
    challenge: "Developing a highly responsive interface for complex professional networks while maintaining low latency.",
    solution: "Implemented efficient state management using React Context and optimized API calls with server-side caching mechanisms."
  },
  "visaensure": {
    id: "visaensure",
    title: "VisaEnsure",
    tagline: "Global Visa Assistance & AI Validation",
    description: "Global visa assistance platform with AI-powered document validation and a student-first user experience designed to simplify complex international travel requirements.",
    role: "UI/UX + Frontend",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    hardware: "N/A",
    image: "/portfolio1assests/visaensure.png",
    liveLink: "https://visaensure.vercel.app/",
    githubLink: "#",
    metrics: [
      "50% reduction in document rejection through AI pre-validation",
      "Served students across 5+ countries for visa applications",
      "Seamless mobile experience for all visa stages"
    ],
    features: [
      "AI-powered document OCR and validation system",
      "Dynamic document checklists based on country profile",
      "Real-time status tracking for visa applications",
      "In-app consultation booking with visa experts"
    ],
    architecture: "Utilizes Next.js and Vercel's serverless functions to scale efficiently during peak visa seasons. The UI is built with Tailwind CSS for rapid prototyping and high performance on mobile devices.",
    challenge: "Accurately validating complex international documents using automated systems.",
    solution: "Implemented an AI-driven OCR layer that pre-scans documents for common errors before submission to actual processing."
  },
  "3d-portfolio": {
    id: "3d-portfolio",
    title: "3D Portfolio Website",
    tagline: "Immersive 3D Experience & Cinematic Motion",
    description: "Immersive 3D portfolio experience crafted with modern web technologies and cinematic motion design to showcase digital craftsmanship.",
    role: "Creative Developer",
    stack: ["Next.js", "Three.js", "Framer Motion"],
    hardware: "N/A",
    image: "/portfolio1assests/my3dportfolioimage.png",
    liveLink: "https://my-3d-portfolio-zeta-coral.vercel.app/",
    githubLink: "#",
    metrics: [
      "Engaged users for an average of 3+ minutes per session",
      "Top-tier performance even with complex 3D rendering",
      "Fluid 60FPS animations on high-refresh displays"
    ],
    features: [
      "Interactive 3D environments using Three.js",
      "Cinematic page transitions with Framer Motion",
      "Responsive layout maintaining 3D integrity across devices",
      "Custom shader effects for immersive lighting"
    ],
    architecture: "Combines the power of Three.js with React Fiber for efficient component-based 3D rendering. Framer Motion handles the heavy lifting of UI animations and state transitions for a seamless journey.",
    challenge: "Optimizing high-end 3D graphics for mobile and low-powered devices.",
    solution: "Leveraged level-of-detail (LOD) techniques and texture compression to ensure smooth performance without sacrificing visual quality."
  },
  "elegance-events": {
    id: "elegance-events",
    title: "Elegance Events",
    tagline: "Event Management & Operations Suite",
    description: "End-to-end event management platform with an admin suite for lead generation, operations, and business insights.",
    role: "Full-Stack Developer",
    stack: ["React", "Node.js", "MongoDB"],
    hardware: "N/A",
    image: "/portfolio1assests/work-4.png",
    liveLink: "https://event-management-nine-chi.vercel.app/",
    githubLink: "#",
    metrics: [
      "Streamlined lead processing by 60% with automated dashboards",
      "Centralized event inventory and vendor management",
      "Built-in analytics for event performance and ROI"
    ],
    features: [
      "Comprehensive admin dashboard for event oversight",
      "Automated lead generation and tracking system",
      "Integrated vendor and client management portals",
      "Customizable event themes and packages"
    ],
    architecture: "Developed a MERN stack application with a focus on administrative efficiency. The dashboard uses advanced filtering and reporting to turn raw lead data into actionable insights for the business owner.",
    challenge: "Managing large volumes of real-time inquiries during peak wedding seasons.",
    solution: "Built a centralized notification and queue management system to ensure no lead goes unanswered."
  },
  "cloud-architecture": {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    tagline: "Enterprise 3-Tier AWS Backbone",
    description: "Enterprise-style 3-tier AWS architecture focused on high availability, security, and resilience for mission-critical applications.",
    role: "Cloud Architect",
    stack: ["EC2", "VPC", "RDS DB"],
    hardware: "AWS Infrastructure",
    image: "/portfolio1assests/work-3.png",
    liveLink: "#",
    githubLink: "#",
    metrics: [
      "99.99% uptime goal based on multi-AZ deployment strategy",
      "Hardened security using private subnets and security groups",
      "Scalable load balancing to handle millions of simultaneous requests"
    ],
    features: [
      "Multi-Availability Zone (AZ) high availability setup",
      "Custom Virtual Private Cloud (VPC) with public/private subnets",
      "Relational Database Service (RDS) with read-replicas",
      "Auto-scaling groups for dynamic load management"
    ],
    architecture: "Designed as a textbook 3-tier infrastructure: A public web layer for load balancing, a private application tier for logic, and a secure data tier for persistence, all within a custom VPC.",
    challenge: "Ensuring zero-downtime deployments while maintaining strict security boundaries.",
    solution: "Implemented a blue-green deployment strategy combined with fine-grained IAM roles and network access control lists (NACLs)."
  }
};
