// Static data for the service page
export const serviceData = {
    id: 1,
    title: "I will build custom ecommerce and real estate websites",
    seller: {
        name: "Akamify",
        rating: 4.9,
        reviews: 127,
        level: "Level 2 Seller",
        logo: "/src/assets/placeholders/seller-logo.svg"
    },
    images: [
        "/img1 (1).png",
        "/img1 (2).jpg",
        "/img1 (3).png",
    ],
    price: {
        basic: 22770,
        standard: 37950,
        premium: 151800
    },
    description: `
    <p>I'm a professional web developer specializing in creating custom e-commerce and real estate websites. With years of experience in modern web technologies, I deliver high-quality, responsive websites tailored to your business needs.</p>
    
    <h3>What I Offer:</h3>
    <ul>
      <li>Custom e-commerce website development</li>
      <li>Real estate listing platforms</li>
      <li>Fully responsive designs</li>
      <li>SEO optimization</li>
      <li>User-friendly admin panels</li>
      <li>Secure payment integration</li>
    </ul>
    
    <h3>Technologies I Use:</h3>
    <ul>
      <li>React.js, Vue.js, or Angular for frontend</li>
      <li>Node.js, PHP, or Python for backend</li>
      <li>MongoDB, MySQL, or PostgreSQL for databases</li>
      <li>Stripe, PayPal, or other payment gateways</li>
    </ul>
  `,
    features: {
        basic: [
            "Functional website",
            "8 pages",
            "Content upload",
            "2 plugins/extensions",
            "E-commerce functionality",
            "20 products",
            "Payment Integration",
            "Opt-in form",
            "Autoresponder integration",
            "Speed optimization",
            "Hosting setup",
            "Social media icons"
        ],
        standard: [
            "Functional website",
            "10 pages",
            "Content upload",
            "4 plugins/extensions",
            "E-commerce functionality",
            "40 products",
            "Payment Integration",
            "Opt-in form",
            "Autoresponder integration",
            "Speed optimization",
            "Hosting setup",
            "Social media icons",
            "Progressive web app",
            "Conversion tools"
        ],
        premium: [
            "Functional website",
            "10 pages",
            "Content upload",
            "6 plugins/extensions",
            "E-commerce functionality",
            "50 products",
            "Payment Integration",
            "Opt-in form",
            "Autoresponder integration",
            "Speed optimization",
            "Hosting setup",
            "Social media icons"
        ]
    },
    faqs: [
        {
            question: "What information do you need to get started?",
            answer: "I'll need details about your business, preferred design style, required features, and any content you'd like to include."
        },
        {
            question: "How long does the development process take?",
            answer: "Depending on complexity, projects typically take 5-15 business days. Exact timeline will be confirmed after discussing your requirements."
        },
        {
            question: "Will my website be mobile-friendly?",
            answer: "Yes, all websites I create are fully responsive and optimized for all devices."
        },
        {
            question: "Do you provide ongoing support?",
            answer: "Yes, I offer maintenance and support packages to keep your website updated and secure."
        }
    ],
    reviews: [
        {
            id: 1,
            user: "John D.",
            country: "United States",
            rating: 5,
            date: "December 10, 2025",
            comment: "Excellent work! The website looks amazing and works perfectly. Highly recommend!"
        },
        {
            id: 2,
            user: "Sarah M.",
            country: "Canada",
            rating: 5,
            date: "November 28, 2025",
            comment: "Professional and responsive developer. Delivered exactly what was promised."
        },
        {
            id: 3,
            user: "Michael T.",
            country: "United Kingdom",
            rating: 4,
            date: "November 15, 2025",
            comment: "Great service overall. Minor revisions were handled quickly."
        }
    ],
    // Related services data
    relatedServices: [
        {
            id: 2,
            title: "I will create a custom WordPress website for your business",
            price: 15180,
            rating: 4.8,
            reviews: 89,
            image: "/img1 (2).jpg"
        },
        {
            id: 3,
            title: "I will develop a mobile-responsive Shopify store",
            price: 22770,
            rating: 4.9,
            reviews: 142,
            image: "/img1 (3).png"
        },
        {
            id: 4,
            title: "I will design a modern landing page for your startup",
            price: 7590,
            rating: 5.0,
            reviews: 56,
            image: "/img1 (1).png"
        },
        {
            id: 5,
            title: "I will build a SaaS web application with React and Node.js",
            price: 75900,
            rating: 4.7,
            reviews: 34,
            image: "/img1 (2).jpg"
        }
    ],
    // Blog data
    blogs: [
        {
            id: 1,
            title: "Top 10 E-commerce Trends for 2026",
            excerpt: "Discover the latest trends that will shape the future of online shopping and how to implement them in your business strategy.",
            date: "December 15, 2025",
            author: "Akamify Team",
            image: "/img1 (1).png"
        },
        {
            id: 2,
            title: "How to Optimize Your Real Estate Website for Conversions",
            excerpt: "Learn proven strategies to increase leads and sales from your real estate website with these essential optimization techniques.",
            date: "December 10, 2025",
            author: "Akamify Team",
            image: "/img1 (3).png"
        }
    ],
    // UGC Videos data
    ugcVideos: [
        {
            id: 1,
            title: "Amazing Product!",
            videoUrl: "/UGC Videos/video1.mp4",
            thumbnail: "https://images.unsplash.com/photo-1766767673683-168676b97f4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
            creator: "Sarah J.",
            likes: 1250,
            comments: 42
        },
        {
            id: 2,
            title: "Unboxing Experience",
            videoUrl: "/UGC Videos/video2.mp4",
            thumbnail: "https://images.unsplash.com/photo-1766703673131-f845ee5e754c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
            creator: "Mike T.",
            likes: 890,
            comments: 28
        },
        {
            id: 3,
            title: "My Day with the Product",
            videoUrl: "/UGC Videos/video3.mp4",
            thumbnail: "https://images.unsplash.com/photo-1766569590132-fb425d91d014?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
            creator: "Emma L.",
            likes: 2100,
            comments: 67
        },
        {
            id: 4,
            title: "Quick Setup Tutorial",
            videoUrl: "/UGC Videos/video4.mp4",
            thumbnail: "https://images.unsplash.com/photo-1766570764539-297a1cd82956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
            creator: "David K.",
            likes: 1560,
            comments: 35
        },
        {
            id: 5,
            title: "Real Results After 1 Week",
            videoUrl: "/UGC Videos/video5.mp4",
            thumbnail: "https://images.unsplash.com/photo-1765748292453-be1838360416?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
            creator: "Lisa M.",
            likes: 3200,
            comments: 89
        },
        {
            id: 6,
            title: "Before and After Comparison",
            videoUrl: "/UGC Videos/video6.mp4",
            thumbnail: "https://images.unsplash.com/photo-1765707885340-55ff6c018519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D",
            creator: "James P.",
            likes: 1780,
            comments: 51
        },
        {
            id: 7,
            title: "My Honest Review",
            videoUrl: "/UGC Videos/video6.mp4",
            thumbnail: "https://plus.unsplash.com/premium_photo-1766340004484-5c0703f74bf1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MHx8fGVufDB8fHx8fA%3D%3D",
            creator: "Anna R.",
            likes: 2450,
            comments: 73
        }
    ]
};

export default serviceData;