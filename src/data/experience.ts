export interface JourneyStep {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  details: string;
  achievements: string[];
  skills: string[];
  gradient: string;
  color: string;
  image?: string;
}

export const journeyData: Record<string, JourneyStep> = {
  "gklt": {
    id: "gklt",
    year: "PRESENT",
    role: "Technical Lead & Cloud Architect",
    company: "GKLT (Manakrishi)",
    description: "Spearheading the development of scalable agri-tech ecosystems. Leading a cross-functional team to deliver high-availability platforms.",
    details: "As the Technical Lead, I architected the Manakrishi platform from the ground up, focusing on a distributed microservices architecture that handles real-time drone telemetry and satellite imagery processing. My role involves not only high-level architecture but also mentoring a team of 10+ engineers and defining the long-term technical roadmap.",
    achievements: [
      "Reduced system latency by 45% through aggressive Redis caching and DB optimization.",
      "Implemented a serverless image processing pipeline handling 50k+ images daily.",
      "Established a 99.99% uptime record for the core agriculture monitoring service.",
      "Architected a custom drone communication protocol over MQTT."
    ],
    skills: ["Cloud Architecture", "AWS", "Next.js", "Node.js", "Python", "MQTT", "Terraform"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "#10b981"
  },
  "enterprise-solutions": {
    id: "enterprise-solutions",
    year: "2025",
    role: "Full-Stack Engineer",
    company: "Enterprise Solutions",
    description: "Architecting production-ready applications with a focus on AWS infrastructure and high-fidelity user interfaces.",
    details: "During my tenure at Enterprise Solutions, I was responsible for modernizing legacy financial dashboards into responsive, high-performance web applications. I led the migration of a major fintech platform to AWS, resulting in significant cost savings and improved scalability.",
    achievements: [
      "Migrated 15+ legacy services to AWS Lambda and ECS.",
      "Implemented a comprehensive CI/CD pipeline using GitHub Actions.",
      "Reduced monthly AWS infrastructure costs by 30% through resource optimization.",
      "Developed a custom UI library used across 3 major internal products."
    ],
    skills: ["Full-Stack Dev", "AWS Lambda", "ECS", "Docker", "React", "PostgreSQL"],
    gradient: "from-blue-500/20 to-indigo-500/20",
    color: "#3b82f6"
  },
  "infra-growth": {
    id: "infra-growth",
    year: "2024",
    role: "Cloud Specialist",
    company: "Infrastructural Growth",
    description: "Deepening expertise in AWS cloud services, focusing on networking, security, and automated deployments.",
    details: "At Infrastructural Growth, I specialized in the 'Infrastructure as Code' paradigm. I built robust, repeatable environments using Terraform and AWS CloudFormation. My work focused on securing cloud networks and implementing automated security auditing.",
    achievements: [
      "Designed a multi-region disaster recovery plan for a high-traffic e-commerce site.",
      "Automated infrastructure provisioning, reducing setup time from days to minutes.",
      "Conducted security audits that identified and patched 20+ critical vulnerabilities.",
      "Implemented VPC peering and Transit Gateway for complex hybrid-cloud setups."
    ],
    skills: ["Cloud Security", "Terraform", "CloudFormation", "VPC Networking", "AWS Security Hub"],
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "#a855f7"
  },
  "product-innovation": {
    id: "product-innovation",
    year: "2023",
    role: "Web Developer",
    company: "Product Innovation",
    description: "Mastered the React ecosystem and Node.js backend development. Built and deployed complex web applications.",
    details: "This period was marked by intense growth in modern web technologies. I built real-time collaborative tools and data-heavy dashboards. I focused on optimizing frontend performance and implementing advanced state management patterns.",
    achievements: [
      "Built a real-time collaborative whiteboard using WebSockets and Socket.io.",
      "Optimized React render cycles, improving FPS on heavy dashboards by 60%.",
      "Integrated complex third-party APIs for financial and geospatial data.",
      "Mentored junior developers on React best practices and testing."
    ],
    skills: ["React", "Node.js", "WebSockets", "Redux", "Zustand", "Jest"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    color: "#06b6d4"
  },
  "tech-foundations": {
    id: "tech-foundations",
    year: "2020",
    role: "Junior Developer",
    company: "Technical Foundations",
    description: "Commenced professional journey with a focus on web fundamentals. Developed a strong base in JavaScript architectures.",
    details: "Started my career with a focus on the core building blocks of the web. I learned the intricacies of the DOM, browser engines, and fundamental design principles. I worked on various static and simple dynamic sites, honing my skills in responsive design.",
    achievements: [
      "Developed 20+ responsive landing pages for small to medium businesses.",
      "Mastered CSS Grid and Flexbox for complex, modern layouts.",
      "Created a reusable animation library using vanilla JavaScript and CSS.",
      "Collaborated with designers to bridge the gap between Figma and Code."
    ],
    skills: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "Git", "Figma"],
    gradient: "from-orange-500/20 to-red-500/20",
    color: "#f97316"
  }
};
