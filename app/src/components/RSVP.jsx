import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Send, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import brideMap from '../../images/large/HERO9809.JPG';

// Initial wedding wishes
const INITIAL_WISHES = [
    "Happily Ever After", "Happy Wedding", "Forever Together", "Forever Love",
    "Blessed Union", "Happy Marriage", "Perfect Happiness", "Best Wishes",
    "Together Forever", "True Love", "Growing Old Together", "Sweet Couple",
    "Wedded Bliss", "Just Married", "Overflowing Love", "Endless Love"
];

const FloatingParticles = () => {
    // Generate random particles (increased count and speed)
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 40 + 10, // 10-50px (smaller but more)
        x: Math.random() * 100,
        duration: Math.random() * 8 + 30, // 5-13s (faster)
        delay: Math.random() * 2
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full blur-md bg-rose-400/20"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: '110%',
                    }}
                    animate={{
                        top: '-10%',
                        x: ['-10px', '10px', '-10px'],
                        opacity: [0, 0.6, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        top: {
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        },
                        x: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        opacity: {
                            duration: p.duration,
                            repeat: Infinity,
                            times: [0, 0.5, 1],
                            ease: "linear",
                            delay: p.delay
                        },
                        scale: {
                            duration: p.duration / 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />
            ))}
        </div>
    );
};

// New Sparkle Effect
const Sparkles = () => {
    const sparkles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full bg-white shadow-[0_0_4px_2px_rgba(255,255,255,0.8)]"
                    style={{
                        width: s.size,
                        height: s.size,
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: s.delay
                    }}
                />
            ))}
        </div>
    );
};

const ScrollingRow = ({ items, reverse = false }) => (
    <div className={`flex whitespace-nowrap overflow-hidden py-3 md:py-6 relative z-10 
        ${reverse ? 'bg-white/30' : 'bg-transparent'} 
        backdrop-blur-[1px]`}
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
    >
        <div className={`flex gap-16 md:gap-32 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} items-center`}>
            {[...items, ...items, ...items].map((item, i) => (
                <div key={i} className="flex items-center gap-8">
                    <span
                        className={`text-5xl md:text-7xl font-script tracking-wide
                        ${reverse ? 'text-rose-900/20' : 'text-rose-800/20'} 
                        bg-clip-text select-none transition-colors duration-500 hover:text-rose-400/40`}
                        style={{
                            textShadow: reverse ? '1px 1px 2px rgba(255,255,255,0.8)' : '1px 1px 1px rgba(244,63,94,0.1)'
                        }}
                    >
                        {item}
                    </span>
                    <Heart className={`w-6 h-6 ${reverse ? 'text-rose-300/30' : 'text-rose-400/30'} fill-current`} />
                </div>
            ))}
        </div>
    </div>
);

export default function RSVP() {
    const [formState, setFormState] = useState({
        name: '',
        guests: 1,
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Load wishes from localStorage or use initial list
    const [wishes, setWishes] = useState(() => {
        const savedWishes = localStorage.getItem('wedding_wishes');
        return savedWishes ? JSON.parse(savedWishes) : INITIAL_WISHES;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Save RSVP data to "JSON" (localStorage simulating a database)
        const newRsvp = {
            ...formState,
            id: Date.now(),
            submittedAt: new Date().toISOString()
        };

        const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        const updatedRsvps = [...existingRsvps, newRsvp];
        localStorage.setItem('wedding_rsvps', JSON.stringify(updatedRsvps));

        // 2. Add message to WISHES if it exists
        if (formState.message.trim()) {
            const newWishes = [formState.message, ...wishes];
            setWishes(newWishes);
            localStorage.setItem('wedding_wishes', JSON.stringify(newWishes));
        }

        // Simulate submission delay
        setTimeout(() => {
            setIsSubmitted(true);

            // Trigger fireworks
            const duration = 3 * 10000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }, 1000);
    };

    return (
        <section id="rsvp" className="py-20 md:py-32 bg-stone-50 relative overflow-hidden min-h-screen flex items-center">
            {/* Premium Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50 via-stone-50 to-stone-100 pointer-events-none" />

            {/* Animated Particles & Sparkles */}
            <FloatingParticles />
            <Sparkles />

            {/* Background Decoration Text */}
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
                <div className="flex flex-col gap-10 -rotate-[8deg] scale-110 opacity-80 origin-center transform translate-y-8">
                    <ScrollingRow items={wishes} />
                    <ScrollingRow items={[...wishes].reverse()} reverse />
                    <ScrollingRow items={wishes} />
                    <ScrollingRow items={[...wishes].reverse()} reverse />
                </div>
            </div>

            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/60">
                    {/* Image Side - Rộng hơn */}
                    <div className="md:w-[45%] bg-rose-100 relative min-h-[350px] md:min-h-[550px] overflow-hidden group">
                        <img
                            src={brideMap}
                            alt="Location Map"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent flex items-end justify-center pb-10">
                            <h3 className="text-3xl md:text-4xl font-script text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Join Our Joy
                            </h3>
                        </div>
                    </div>

                    {/* Form Side - Rộng hơn với padding tốt hơn */}
                    <div className="md:w-[55%] p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white to-rose-50/30">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <span className="h-[1px] w-10 bg-rose-300"></span>
                                <span className="text-rose-500 uppercase tracking-[0.25em] text-sm font-bold">Celebration</span>
                                <span className="h-[1px] w-10 bg-rose-300"></span>
                            </div>
                            <h2 className="text-6xl font-serif text-gray-800 mb-4">RSVP</h2>
                            <p className="text-gray-500 text-base font-light">We would love to have you with us.<br />Please confirm below.</p>
                        </div>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200/50 ring-4 ring-green-100">
                                    <Check className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl font-serif text-gray-800 mb-2">Thank You!</h3>
                                <p className="text-gray-500 text-lg">Your response has been saved.</p>
                                <p className="text-gray-400 text-sm mt-8 font-medium tracking-wide">WE CAN'T WAIT TO SEE YOU!</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50/50 border border-stone-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100/50 outline-none transition-all duration-300 placeholder-gray-300 text-base"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="Type your full name"
                                    />
                                </div>

                                {/* Phone & Guests - Grid layout với tỷ lệ cố định */}
                                <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4">
                                    {/* Phone - chiếm 60% */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-stone-50/50 border border-stone-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100/50 outline-none transition-all duration-300 placeholder-gray-300 text-base"
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value.replace(/\D/g, '') })}
                                            placeholder="0912 345 678"
                                        />
                                    </div>
                                    {/* Guests - chiếm 40% */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Guests</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-5 py-4 rounded-2xl bg-stone-50/50 border border-stone-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100/50 outline-none transition-all duration-300 appearance-none cursor-pointer text-base pr-10"
                                                value={formState.guests}
                                                onChange={e => setFormState({ ...formState, guests: e.target.value })}
                                            >
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Wishes</label>
                                    <textarea
                                        rows="3"
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50/50 border border-stone-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100/50 outline-none transition-all duration-300 placeholder-gray-300 resize-none text-base"
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Send your warmest wishes..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-2xl font-bold tracking-wider hover:from-rose-500 hover:to-rose-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-rose-200/80 transform hover:-translate-y-1 active:translate-y-0 text-lg uppercase"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>CONFIRM ATTENDANCE</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
