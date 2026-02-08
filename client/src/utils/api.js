export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchPackages() {
    try {
        const response = await fetch(`${API_BASE_URL}/packages`);
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn("API Error (fetchPackages):", error);
        // Fallback or empty array
        return [];
    }
}

export async function createBooking(bookingData) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("Booking API Error (createBooking):", error);
        // Return a mock success so the UI can proceed to WhatsApp
        return { success: false, message: 'Network error, falling back to WhatsApp' };
    }
}
