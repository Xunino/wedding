import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Couple', href: '#couple' },
        { name: 'Timeline', href: '#timeline' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Map', href: '#map' },
        { name: 'RSVP', href: '#rsvp' },
        { name: 'Gift', href: '#gift' },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinks.forEach((link) => {
            const sectionId = link.href.substring(1);
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (href) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${isScrolled || isMobileMenuOpen
                ? 'bg-white shadow-sm py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => scrollToSection('#hero')}
                    >
                        <Heart
                            className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-rose-500' : 'text-rose-500 md:text-white'} fill-current group-hover:scale-110`}
                            viewBox="0 3 24 24"
                        />
                        <span className={`font-script text-xl md:text-2xl transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-rose-900' : 'text-rose-900 md:text-white'}`}>
                            L & T
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className={`text-sm tracking-wide transition-all duration-300 relative group py-1
                                    ${activeSection === link.href.substring(1)
                                        ? (isScrolled ? 'text-rose-600 font-semibold' : 'text-white font-semibold')
                                        : (isScrolled ? 'text-gray-600 hover:text-rose-500' : 'text-white/80 hover:text-white')
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-current transition-all duration-300 ease-out
                                    ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                ></span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-1.5 rounded-md transition-colors ${isMobileMenuOpen ? 'text-rose-600 bg-rose-50' : 'text-rose-500 bg-white/40'} backdrop-blur-md`}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-32 px-4 pb-6 overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className={`block w-full text-left px-5 py-4 rounded-xl transition-all text-lg font-medium active:scale-95 transform duration-200
                                        ${activeSection === link.href.substring(1)
                                            ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100'
                                            : 'text-gray-600 hover:bg-rose-50/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{link.name}</span>
                                        {activeSection === link.href.substring(1) && <Heart className="w-5 h-5 fill-current" />}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
