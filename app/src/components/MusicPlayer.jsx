import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
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
                // Reset flag to allow retry on next interaction
                isAttemptingPlay = false;

                // Note: We DO NOT remove listeners here. They stay active 
                // until one of them successfully triggers play().
            }
        };

        // Initial attempt
        const timer = setTimeout(playAudio, 200);

        // Add persistent listeners (removed locally in playAudio on success)
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
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop src="/music/honcayeu.mp3" />

            <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isPlaying ? 'bg-rose-500 text-white animate-spin-slow' : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
            >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
            </button>
        </div>
    );
}
