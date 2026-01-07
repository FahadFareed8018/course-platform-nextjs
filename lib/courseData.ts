// Mock course data service
// In production, this would fetch from an API or database

export interface Course {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  provider: {
    name: string;
    url?: string;
  };
  instructor: {
    name: string;
    bio?: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  duration: string; // e.g., "8 hours", "6 weeks"
  level: string; // e.g., "Beginner", "Intermediate", "Advanced"
  rating: number;
  reviewCount: number;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  language: string;
  updatedAt: string;
}

// Mock courses database
const mockCourses: Course[] = [
  {
    id: "1",
    name: "Complete Web Development Bootcamp",
    description: "Master web development with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.",
    longDescription: `
      This comprehensive web development bootcamp covers everything you need to become a professional full-stack developer. 
      You'll start with the fundamentals of HTML, CSS, and JavaScript, then progress to modern frameworks like React for frontend development 
      and Node.js for backend development. Throughout the course, you'll build multiple real-world projects that you can add to your portfolio.
      
      By the end of this course, you'll be able to build dynamic, responsive web applications from scratch, deploy them to production, 
      and understand the full stack development workflow. Perfect for beginners with no prior coding experience or intermediate developers 
      looking to expand their skillset.
    `,
    provider: {
      name: "Tech Academy",
      url: "https://techacademy.com"
    },
    instructor: {
      name: "Sarah Johnson",
      bio: "Senior Full-Stack Developer with 10+ years of experience building scalable web applications."
    },
    price: {
      amount: 199.99,
      currency: "USD"
    },
    duration: "40 hours",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 3247,
    imageUrl: "/api/placeholder/1200x630",
    thumbnailUrl: "/api/placeholder/800x450",
    category: "Web Development",
    language: "English",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Advanced Machine Learning with Python",
    description: "Deep dive into machine learning algorithms, neural networks, and deep learning. Hands-on projects with TensorFlow and PyTorch.",
    longDescription: `
      Take your machine learning skills to the next level with this advanced course. You'll explore cutting-edge algorithms, 
      neural network architectures, and deep learning frameworks. Work with real datasets and build models that solve complex problems.
      
      Topics include convolutional neural networks, recurrent neural networks, transfer learning, and model optimization techniques. 
      This course is designed for developers with prior Python and basic ML knowledge who want to become experts in the field.
    `,
    provider: {
      name: "Data Science Institute",
      url: "https://datascienceinstitute.com"
    },
    instructor: {
      name: "Dr. Michael Chen",
      bio: "PhD in Computer Science, former ML Engineer at leading tech companies, published researcher."
    },
    price: {
      amount: 299.99,
      currency: "USD"
    },
    duration: "60 hours",
    level: "Advanced",
    rating: 4.9,
    reviewCount: 1892,
    imageUrl: "/api/placeholder/1200x630",
    thumbnailUrl: "/api/placeholder/800x450",
    category: "Data Science",
    language: "English",
    updatedAt: "2024-02-01"
  },
  {
    id: "3",
    name: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native. Create iOS and Android apps with a single codebase.",
    longDescription: `
      Learn to build native mobile applications for both iOS and Android using React Native. This course covers everything from 
      setting up your development environment to publishing apps to the App Store and Google Play Store.
      
      You'll learn about navigation, state management, API integration, native modules, and performance optimization. 
      By the end, you'll have built several fully functional mobile apps that you can showcase in your portfolio.
    `,
    provider: {
      name: "Mobile Dev Academy",
      url: "https://mobiledevacademy.com"
    },
    instructor: {
      name: "Emily Rodriguez",
      bio: "Mobile app developer with 8+ years of experience. Built apps used by millions of users worldwide."
    },
    price: {
      amount: 249.99,
      currency: "USD"
    },
    duration: "35 hours",
    level: "Intermediate",
    rating: 4.7,
    reviewCount: 2156,
    imageUrl: "/api/placeholder/1200x630",
    thumbnailUrl: "/api/placeholder/800x450",
    category: "Mobile Development",
    language: "English",
    updatedAt: "2024-01-20"
  }
];

// Simulate async data fetch (as it would be in production)
export async function getCourseById(id: string): Promise<Course | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const course = mockCourses.find(c => c.id === id);
  return course || null;
}

// Get all course IDs (useful for static generation)
export async function getAllCourseIds(): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockCourses.map(course => course.id);
}

