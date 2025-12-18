import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef(null);

    // Auto-play music when component mounts
    useEffect(() => {
        const interactionEvents = ['click', 'touchstart', 'touchend', 'scroll', 'mousemove', 'keydown'];
        let isAttemptingPlay = false;

        const playAudio = async () => {
            if (isAttemptingPlay || isPlaying) return;
            isAttemptingPlay = true;

            try {
                if (audioRef.current) {
                    audioRef.current.volume = 0.30;
                    await audioRef.current.play();
                    setIsPlaying(true);
                    // Success! Remove all listeners
                    interactionEvents.forEach(event =>
                        document.removeEventListener(event, playAudio, { capture: true })
                    );
                }
            } catch (error) {
                console.log('Autoplay prevented. Waiting for valid user interaction.', error);
                setIsPlaying(false);
                isAttemptingPlay = false;
            }
        };

        const timer = setTimeout(playAudio, 1000);

        interactionEvents.forEach(event =>
            document.addEventListener(event, playAudio, { capture: true })
        );

        return () => {
            clearTimeout(timer);
            interactionEvents.forEach(event =>
                document.removeEventListener(event, playAudio, { capture: true })
            );
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <audio ref={audioRef} loop src="/music/honcayeu.mp3" />

            <motion.button
                layout
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex items-center gap-3 pl-4 pr-2 py-2 rounded-full shadow-lg border border-white/20 transition-all duration-300 backdrop-blur-md ${isPlaying
                        ? 'bg-rose-500/90 text-white shadow-rose-200/50'
                        : 'bg-white/90 text-gray-800 hover:bg-white'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex flex-col items-start mr-2">
                    <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                        {isPlaying ? 'Playing' : 'Paused'}
                    </span>
                    <span className="text-xs font-bold whitespace-nowrap">
                        Hơn Cả Yêu
                    </span>
                </div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-white text-rose-500' : 'bg-rose-100 text-rose-500'
                    }`}>
                    {isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4">
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-current rounded-full" />
                            <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-current rounded-full" />
                            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-current rounded-full" />
                        </div>
                    ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                    )}
                </div>
            </motion.button>
        </div>
    );
}
