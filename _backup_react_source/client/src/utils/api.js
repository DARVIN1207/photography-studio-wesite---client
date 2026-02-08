// Simulate backend data for static GitHub Pages hosting
const MOCK_PACKAGES = [
    { title: 'Gold Package', price: '₹50,000', features: ['Photo + Video', 'Design Album'] },
    { title: 'Silver Package', price: '₹35,000', features: ['Photo Only', 'Soft Copy'] },
    { title: 'Platinum Package', price: '₹80,000', features: ['Cinematic Video', 'Drone', 'Premium Album'] }
];

export async function fetchPackages() {
    // Return mock data immediately
    return Promise.resolve(MOCK_PACKAGES);
}

export async function createBooking(bookingData) {
    console.log("Mock Booking Created:", bookingData);
    // Return success to trigger WhatsApp redirect
    return Promise.resolve({ success: true, message: 'Redirecting to WhatsApp...', booking: bookingData });
}

// Helper for image URLs (if needed in future)
export const getImageUrl = (path) => {
    return path; // Basic pass-through for static assets
};
