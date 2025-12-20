import React, { useState, useEffect } from 'react';

export default function GrainOverlay() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if window is available (client-side)
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(min-width: 768px)');

        // Set initial value
        setIsDesktop(mediaQuery.matches);

        // Handler for media query changes
        const handleChange = (e) => setIsDesktop(e.matches);

        // Add listener
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Don't render the heavy SVG filter on mobile
    if (!isDesktop) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}
