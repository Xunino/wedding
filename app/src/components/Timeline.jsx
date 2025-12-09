import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Music, Utensils, Camera } from 'lucide-react';

const events = [
    { time: '09:00 AM', title: 'Welcome Guests', icon: Heart, description: 'Guests arrive and enjoy welcome drinks.' },
    { time: '10:00 AM', title: 'The Ceremony', icon: Heart, description: 'Exchange of vows and rings.' },
    { time: '11:00 AM', title: 'Photo Session', icon: Camera, description: 'Group photos with family and friends.' },
    { time: '12:00 PM', title: 'Lunch Reception', icon: Utensils, description: 'Enjoy a delicious meal together.' },
    { time: '02:00 PM', title: 'Party Time', icon: Music, description: 'Music, dancing, and celebration.' },
];

export default function Timeline() {
    return (
        <section id="timeline" className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Wedding Schedule</h2>
                    <p className="text-xl text-rose-500 font-serif mb-2">January 11, 2026</p>
                    <p className="text-gray-500 font-light tracking-wide uppercase">How the day will unfold</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-rose-200" />

                    <div className="space-y-12">
                        {events.map((event, index) => {
                            const Icon = event.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                        <h3 className="text-xl font-serif text-rose-600 mb-1">{event.title}</h3>
                                        <p className="text-gray-500 text-sm mb-2">{event.description}</p>
                                        <div className={`inline-flex items-center gap-2 text-rose-400 font-medium text-sm ${index % 2 === 0 ? 'justify-end' : 'justify-start'
                                            }`}>
                                            <Clock className="w-4 h-4" />
                                            {event.time}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-rose-200 rounded-full flex items-center justify-center z-10 shadow-md">
                                        <Icon className="w-5 h-5 text-rose-500" />
                                    </div>

                                    {/* Empty Space for Balance */}
                                    <div className="w-5/12" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
