import React from 'react';
import { Users, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialIcon = ({ Icon }) => (
    <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-rose-500 cursor-pointer hover:bg-rose-50 transition-colors"
    >
        <Icon size={18} />
    </motion.div>
);

const CoupleProfile = ({ fatherName, motherName, address, name, role, image, description, align }) => {
    const isLeft = align === 'left';

    return (
        <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -100 : 100, rotate: isLeft ? -5 : 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative group w-full max-w-sm md:w-1/2"
            >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Decorative Frame */}
                    <div className="absolute inset-4 border border-white/30 rounded-[1.5rem] z-20 pointer-events-none" />
                </div>

                {/* Floating Role Badge */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`absolute -bottom-6 ${isLeft ? 'right-6' : 'left-6'} bg-white px-8 py-3 rounded-full shadow-xl border border-rose-100 z-30`}
                >
                    <span className="font-serif italic text-2xl text-rose-600">{role}</span>
                </motion.div>

                {/* Background Decoration */}
                <div className={`absolute -z-10 top-10 ${isLeft ? '-left-10' : '-right-10'} w-full h-full border-2 border-rose-200/60 rounded-[2rem]`} />
            </motion.div>

            {/* Content Section */}
            <div className={`w-full md:w-1/2 text-center ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-5xl md:text-6xl font-script text-gray-800 mb-6">{name}</h3>

                    <div className={`flex flex-col gap-2 ${isLeft ? 'items-center md:items-start' : 'items-center md:items-end'} mb-8`}>
                        <div className="h-1 w-20 bg-rose-300 rounded-full" />
                    </div>

                    <p className="text-gray-600 leading-loose mb-8 font-light text-lg">
                        {description}
                    </p>

                    <div className={`space-y-4 ${isLeft ? 'items-center md:items-start' : 'items-center md:items-end'} flex flex-col`}>
                        <div className="flex items-center gap-3 text-gray-600 bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-rose-100 shadow-sm w-fit">
                            <Users className="w-5 h-5 text-rose-400" />
                            <div className="text-sm">
                                <span className="block text-gray-400 text-xs uppercase tracking-wider">Parents</span>
                                <span className="font-medium">Mr. {fatherName} & Mrs. {motherName}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600 bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-rose-100 shadow-sm w-fit">
                            <MapPin className="w-5 h-5 text-rose-400" />
                            <div className="text-sm">
                                <span className="block text-gray-400 text-xs uppercase tracking-wider">From</span>
                                <span className="font-medium">{address}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function Couple({ weddingDetails }) {
    return (
        <section id="couple" className="py-24 md:py-40 bg-gradient-to-b from-white to-rose-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-24 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <span className="text-rose-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">The Happy Couple</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-gray-800 mb-6">Groom & Bride</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="h-px w-12 bg-rose-200" />
                            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
                            <div className="h-px w-12 bg-rose-200" />
                        </div>
                    </motion.div>

                    {/* Background Text Decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] leading-none font-script text-rose-100/20 pointer-events-none whitespace-nowrap z-0">
                        Love Story
                    </div>
                </div>

                <div className="space-y-32">
                    <CoupleProfile
                        name={weddingDetails.brideName}
                        fatherName={weddingDetails.brideFatherName}
                        motherName={weddingDetails.brideMotherName}
                        address={weddingDetails.brideAddress}
                        role="The Bride"
                        image={weddingDetails.brideImage}
                        description={weddingDetails.brideDescription}
                        align="left"
                    />

                    <CoupleProfile
                        name={weddingDetails.groomName}
                        fatherName={weddingDetails.groomFatherName}
                        motherName={weddingDetails.groomMotherName}
                        address={weddingDetails.groomAddress}
                        role="The Groom"
                        image={weddingDetails.groomImage}
                        description={weddingDetails.groomDescription}
                        align="right"
                    />
                </div>
            </div>
        </section>
    );
}
