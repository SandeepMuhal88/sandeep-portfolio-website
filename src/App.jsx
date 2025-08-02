import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Database, Brain, Globe, Calendar, User,Youtube,Twitter, BookOpen, MessageSquare, Coffee, Instagram } from 'lucide-react'
import BlogList from './components/BlogList.jsx'
import BlogPost from './components/BlogPost.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState('portfolio') // 'portfolio', 'blog', 'blogPost'
  const [selectedPost, setSelectedPost] = useState(null)

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Building a Movie Recommendation System with Machine Learning",
      excerpt: "Learn how to create a recommendation engine using collaborative filtering and content-based filtering techniques in Python.",
      date: "2024-01-15",
      tags: ["Machine Learning", "Python", "Recommendation Systems"],
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Deep Dive into SMS Spam Detection using NLP",
      excerpt: "Explore natural language processing techniques to build an accurate spam detection model with high precision.",
      date: "2024-01-10",
      tags: ["NLP", "Classification", "Text Processing"],
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Car Price Prediction: From Data to Deployment",
      excerpt: "A comprehensive guide on building and deploying a machine learning model for car price prediction.",
      date: "2024-01-05",
      tags: ["Regression", "Model Deployment", "Data Science"],
      readTime: "10 min read"
    }
  ]

  const projects = [
    {
      title: "Movie Recommendation System",
      description: "Built a recommendation engine that suggests movies to users based on their preferences using collaborative filtering and content-based filtering.",
      technologies: ["Python", "Machine Learning", "Collaborative Filtering", "Content-Based Filtering"],
      keyContributions: "Designed the recommendation algorithm, handled data preprocessing, and optimized model performance.",
      github: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Movie_Recommnder_System_Project",
      demo: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Movie_Recommnder_System_Project"
    },
    {
      title: "Car Price Prediction Model",
      description: "Built a machine learning model to predict car prices based on various features such as brand, model, year, engine size, and mileage.",
      technologies: ["Python", "Linear Regression", "Random Forest", "Gradient Boosting", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      keyContributions: "Collected and preprocessed the data, developed multiple regression models, optimized model performance, and visualized prediction results.",
      github: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Car_Price_prediction",
      demo: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/Car_Price_prediction"
    },
    {
      title: "SMS Spam Detection",
      description: "Developed a text classification model to identify spam messages from legitimate SMS messages with high accuracy.",
      technologies: ["Python", "NLP", "Scikit-learn", "NLTK", "Streamlit"],
      keyContributions: "Implemented NLP techniques for text preprocessing, vectorized data, and optimized model for better classification accuracy.",
      github: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/SMS_Spam_Classifiers",
      demo: "https://github.com/SandeepMuhal88/Project_In_Machine_Learning/tree/main/SMS_Spam_Classifiers"
    },
    {
      title: "Olympic Data Analysis Project",
      description: "Conducted detailed data analysis on Olympic datasets to explore country-wise medal distributions, sport-wise performance trends, and athlete demographics.",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      keyContributions: "Processed complex datasets, visualized performance patterns, and generated actionable insights that provide a deep understanding of Olympic history and achievements.",
      github: "https://github.com/SandeepMuhal88/OLYMPICS-ANALYSIS-WEB-APP",
      demo: "https://github.com/SandeepMuhal88/OLYMPICS-ANALYSIS-WEB-APP"
    }
  ]

  const skills = {
    "Programming Languages": ["C", "Python", "SQL"],
    "Frontend Development": ["HTML", "CSS", "JavaScript"],
    "Data Analysis": ["Pandas", "NumPy", "Scikit-Learn"],
    "Data Visualization": ["Matplotlib", "Seaborn"],
    "Machine Learning": ["Regression", "Classification", "Neural Networks"],
    "Frameworks & Tools": ["Jupyter", "Kaggle", "Google Colab", "Streamlit", "PyTorch", "TensorFlow", "Keras"],
    "Version Control": ["Git", "GitHub"],
    "Specialized Skills": ["Data Preprocessing", "Model Deployment", "Exploratory Data Analysis", "Neural Network Design"]
  }

  const scrollToSection = (sectionId) => {
    if (sectionId === 'blog') {
      setCurrentView('blog')
      setActiveSection('blog')
    } else {
      setCurrentView('portfolio')
      setActiveSection(sectionId)
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const handlePostSelect = (post) => {
    setSelectedPost(post)
    setCurrentView('blogPost')
  }

  const handleBackToBlog = () => {
    setCurrentView('blog')
    setSelectedPost(null)
  }

  const handleBackToPortfolio = () => {
    setCurrentView('portfolio')
    setActiveSection('home')
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'education', 'blog', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Particle component
  const Particles = () => (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Render different views based on currentView state */}
      {currentView === 'blog' && (
        <div>
          {/* Blog Navigation */}
          <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-md border-b border-border z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <button 
                  onClick={handleBackToPortfolio}
                  className="text-2xl font-bold text-primary hover:text-accent transition-colors"
                >
                  Sandeep Muhal
                </button>
                <Button onClick={handleBackToPortfolio} variant="outline" className="hover-glow">
                  Back to Portfolio
                </Button>
              </div>
            </div>
          </nav>
          <div className="pt-20">
            <BlogList posts={blogPosts} onPostSelect={handlePostSelect} />
          </div>
        </div>
      )}

      {currentView === 'blogPost' && selectedPost && (
        <div>
          {/* Blog Post Navigation */}
          <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-md border-b border-border z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <button 
                  onClick={handleBackToPortfolio}
                  className="text-2xl font-bold text-primary hover:text-accent transition-colors"
                >
                  Sandeep Muhal
                </button>
                <div className="space-x-4">
                  <Button onClick={handleBackToBlog} variant="outline" className="hover-glow">
                    Back to Blog
                  </Button>
                  <Button onClick={handleBackToPortfolio} variant="outline" className="hover-glow">
                    Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-20">
            <BlogPost post={selectedPost} onBack={handleBackToBlog} />
          </div>
        </div>
      )}

      {currentView === 'portfolio' && (
        <div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-primary">Sandeep Muhal</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'education', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item 
                      ? 'nav-active' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {['home', 'about', 'projects', 'skills', 'education', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize text-muted-foreground hover:text-primary"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

{/* Hero Section */}
<section
  id="home"
  className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 animated-bg overflow-hidden"
>
  <AnimatedBackground />
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center py-20">
      {/* Profile Image */}
      <div className="w-40 h-40 profile-glow rounded-full mx-auto mb-8 bg-gradient-to-br from-primary to-accent pulse-glow overflow-hidden">
        <img
          src="images/profile.jpg"
          alt="Sandeep Muhal"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-lg text-primary mb-3">Hello, I'm</p>
      <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
        Sandeep Muhal
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-2 typing-animation">
        Computer Science & Engineering Student
      </p>
      <p className="text-lg text-accent mb-8">
        <span className="text-primary">Data Scientist</span> |{" "}
        <span className="text-accent">Machine Learning Engineer</span> |{" "}
        <span className="text-chart-3">Web Developer</span>
      </p>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
        👨‍💻 Python, Machine Learning, Data Science & Web Development 🚗 Built
        solutions for recommendation systems, spam detection, and data
        analysis. ⚡ Turning ideas into reality with code!
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          onClick={() => scrollToSection("projects")}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg hover-glow pulse-glow"
        >
          Explore My Work
        </Button>
        <Button
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 text-lg hover-glow"
        >
          Contact Me
        </Button>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-6">
        <a
          href="https://github.com/SandeepMuhal88" target="_blank"
          className="text-muted-foreground hover:text-primary transition-colors hover-glow"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/sandeep-muhal-5672aa285/" target="_blank"
          className="text-muted-foreground hover:text-primary transition-colors hover-glow"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="mailto:sandeepmuhal8840@gmail.com" target="_blank"
          className="text-muted-foreground hover:text-primary transition-colors hover-glow"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">About Me</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover my journey, skills, and what drives my passion for creating exceptional digital experiences.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Who am I?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                I'm Sandeep Muhal, a passionate Computer Science and Engineering student at Bikaner Technical University, 
                transforming complex data into actionable insights and innovative solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                My expertise lies in Python, Machine Learning, Deep Learning and Data Science, where I blend technical 
                skills with creative problem-solving to build intelligent systems that make a difference.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                When I'm not coding, you'll find me exploring the latest advancements in AI, contributing to open-source 
                projects, or mentoring aspiring data scientists.
              </p>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>Kishangrah, Ajmer, Rajasthan</span>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span>sandeepmuhal8840@gmail.com</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>+91 7879496344</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="hover-lift bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Brain className="w-5 h-5 mr-2 text-primary" />
                    Expertise Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">Machine Learning</Badge>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">Deep Learning</Badge>
                    <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">Data Analysis</Badge>
                    <Badge variant="secondary" className="bg-chart-4/20 text-chart-4">NLP</Badge>
                    <Badge variant="secondary" className="bg-chart-5/20 text-chart-5">Web Development</Badge>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">Model Deployment</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center hover-lift bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">4+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="text-center hover-lift bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-accent mb-2">2+</div>
                    <div className="text-sm text-muted-foreground">Years Learning</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 animated-bg-programming relative">
        <div className="tech-grid absolute inset-0 opacity-30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">My Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A collection of my recent work, showcasing my skills and expertise in machine learning and data science.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover-lift bg-card border-border group">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-primary/30 text-primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Contributions:</h4>
                    <p className="text-sm text-muted-foreground">{project.keyContributions}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="flex items-center hover-glow" onClick={() => window.open(project.github, '_blank')}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center hover-glow" onClick={() => window.open(project.demo, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Technical Arsenal</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore my specialized skill domains and tech stack
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => {
              const colors = ['primary', 'accent', 'chart-3', 'chart-4', 'chart-5', 'primary', 'accent', 'chart-3']
              const color = colors[index % colors.length]
              
              return (
                <Card key={index} className="hover-lift bg-card border-border group">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center group-hover:text-primary transition-colors">
                      {category === "Programming Languages" && <Code className={`w-5 h-5 mr-2 text-${color}`} />}
                      {category === "Data Analysis" && <Database className={`w-5 h-5 mr-2 text-${color}`} />}
                      {category === "Machine Learning" && <Brain className={`w-5 h-5 mr-2 text-${color}`} />}
                      {category === "Frontend Development" && <Globe className={`w-5 h-5 mr-2 text-${color}`} />}
                      {!["Programming Languages", "Data Analysis", "Machine Learning", "Frontend Development"].includes(category) && <Code className={`w-5 h-5 mr-2 text-${color}`} />}
                      {category}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {skillList.length} skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className={`text-xs bg-${color}/20 text-${color}`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Education</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="hover-lift bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-primary" />
                  Bachelor of Technology in Computer Science and Engineering
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Bikaner Technical University
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-muted-foreground">Expected August 2026</span>
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold text-foreground">CGPA: </span>
                      <span className="text-primary font-bold">7.93/10.0</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Relevant Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Data Structures and Algorithms", "Machine Learning", "Python", "SQL", "C"].map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-accent/30 text-accent">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Latest Blog Posts</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sharing insights, tutorials, and experiences in Machine Learning, Data Science, and Web Development
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover-lift bg-card border-border cursor-pointer group" onClick={() => handlePostSelect(post)}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-primary">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-accent/20 text-accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full hover-glow">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => scrollToSection('blog')}
              className="bg-primary hover:bg-primary/90 text-white hover-glow"
            >
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Get In Touch</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">sandeepmuhal8840@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">+91 7879496344</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">Kishangrah, Ajmer, Rajasthan, India</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="https://github.com/Sandeepmuhal88" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/sandeep-muhal-5672aa285/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/i_sandeepmuhal8/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href='https://www.youtube.com/@sandeepmuhal88' target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://x.com/i_sandeepmuhal8" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://drive.google.com/file/d/17EZRP0yM7X-rzywgbz01SVW1Ujo5_MBj/view?usp=drive_link" target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
                  <Coffee className="w-6 h-6" />
                </a>
              </div>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div>
                    <Input placeholder="Subject" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" rows={4} className="bg-secondary border-border text-foreground" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white hover-glow">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Sandeep Muhal.
          </p>
        </div>
      </footer>
        </div>
      )}
    </div>
  )
}

export default App

