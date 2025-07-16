import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, Calendar, Clock } from 'lucide-react'

const BlogList = ({ posts, onPostSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags))]

  // Filter posts based on search term and selected tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-background text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Tech Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sharing insights, tutorials, and experiences in Machine Learning, Data Science, and Web Development
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border text-foreground"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag('')}
            className={selectedTag === '' ? 'bg-primary text-white' : 'border-border text-muted-foreground hover:text-foreground'}
          >
            All Topics
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? 'bg-primary text-white' : 'border-border text-muted-foreground hover:text-foreground'}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className="hover-lift bg-card border-border cursor-pointer h-full flex flex-col group"
            onClick={() => onPostSelect(post)}
          >
            <CardHeader className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center text-sm text-primary">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-accent/20 text-accent">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full hover-glow border-border text-muted-foreground hover:text-foreground">
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
        </div>
      )}

      {/* Categories Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Popular Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Machine Learning", count: 8, color: "primary" },
            { name: "Data Science", count: 6, color: "chart-3" },
            { name: "Web Development", count: 4, color: "accent" },
            { name: "Tutorials", count: 5, color: "chart-4" }
          ].map((category) => (
            <Card key={category.name} className="text-center hover-lift bg-card border-border cursor-pointer group">
              <CardContent className="p-6">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${category.color}/20 text-${category.color} mb-2`}>
                  {category.name}
                </div>
                <p className="text-muted-foreground">{category.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogList

