import { useState, useEffect } from 'react';

interface MotionPreferences {
	prefersReducedMotion: boolean;
	isHighPerformanceDevice: boolean;
	isTouchDevice: boolean;
}

// Define a Battery interface for the Navigator API
interface Battery {
	level: number;
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
}

interface NavigatorWithBattery extends Navigator {
	getBattery?: () => Promise<Battery>;
}

/**
 * Custom hook to detect user's motion preferences and device capabilities
 * Used to optimize animations and effects based on user preferences and device performance
 */
export const useMotionPreference = (): MotionPreferences => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
	const [isHighPerformanceDevice, setIsHighPerformanceDevice] = useState<boolean>(true);
	const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

	useEffect(() => {
		// Check if user prefers reduced motion
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(motionQuery.matches);

		const updateMotionPreference = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};

		motionQuery.addEventListener('change', updateMotionPreference);

		// Detect touch device
		const detectTouch = () => {
			setIsTouchDevice(true);
			window.removeEventListener('touchstart', detectTouch);
		};

		window.addEventListener('touchstart', detectTouch);

		// Approximate device performance
		// This is a simple heuristic and not completely reliable
		const checkPerformance = () => {
			// Check for devices with potential performance limitations
			const userAgent = navigator.userAgent.toLowerCase();
			const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

			// For older mobile devices or with battery saver mode, reduce effects
			const isOlderDevice = isMobile &&
				(
					userAgent.includes('android 7') ||
					userAgent.includes('android 8') ||
					userAgent.includes('android 9') ||
					userAgent.includes('iphone os 12') ||
					userAgent.includes('iphone os 13')
				);

			// If device is in low power mode, we might not be able to detect it directly,
			// but we can use a combination of factors
			const navigatorWithBattery = navigator as NavigatorWithBattery;
			const potentiallyLowPower = navigatorWithBattery.getBattery &&
				navigatorWithBattery.getBattery().then((battery: Battery) => {
					return battery.level < 0.2; // Arbitrary threshold for low battery
				}).catch(() => false);

			setIsHighPerformanceDevice(!(isOlderDevice || potentiallyLowPower));
		};

		checkPerformance();

		return () => {
			motionQuery.removeEventListener('change', updateMotionPreference);
			window.removeEventListener('touchstart', detectTouch);
		};
	}, []);

	return { prefersReducedMotion, isHighPerformanceDevice, isTouchDevice };
};

export default useMotionPreference; 