'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ModeToggle } from './ui/theme-button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { Button } from './ui/button'
import { 
  Search, 
  Menu, 
  X,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Bitcoin,
  Landmark,
  BookOpen,
  Briefcase,
  PiggyBank
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const categories = [
  { name: "Investing", href: "/category/investing", icon: <TrendingUp size={16} /> },
  { name: "Saving", href: "/category/saving", icon: <PiggyBank size={16} /> },
  { name: "Cryptocurrency", href: "/category/cryptocurrency", icon: <Bitcoin size={16} /> },
  { name: "Banking", href: "/category/banking", icon: <Landmark size={16} /> },
  { name: "Education", href: "/category/education", icon: <BookOpen size={16} /> },
  { name: "Career", href: "/category/career", icon: <Briefcase size={16} /> },
  { name: "Trending", href: "/category/trending", icon: <TrendingUp size={16} /> }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="py-4 px-5 border-b">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Categories <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.name}>
                  <Link href={category.href} className="flex items-center gap-2 w-full">
                    {category.icon}
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </div>


        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden space-x-2">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} pt-4`}>
        <div className="flex flex-col space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Home</Button>
          </Link>
          <div className="border-t py-2">
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Categories</div>
            {categories.map((category) => (
              <Link key={category.name} href={category.href} onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start flex items-center gap-2">
                  {category.icon}
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
          <div className="border-t py-2">
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">About</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      
    </nav>
  )
}

export default Navbar