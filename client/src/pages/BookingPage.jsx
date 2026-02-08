import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Package, Phone, User, MessageSquare } from 'lucide-react';
import { createBooking } from '../utils/api';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const preSelectedPackage = location.state?.selectedPackage;

    const [selectedCountry, setSelectedCountry] = useState('+91');
    const [formData, setFormData] = useState({
        clientName: '',
        phone: '+91 ',
        shootType: preSelectedPackage?.shootType || 'Wedding',
        serviceType: 'Photo & Video',
        selectedPackage: preSelectedPackage?.title || '',
        date: '',
        location: '',
        notes: ''
    });

    const COUNTRY_CODES = [
        { code: '+91', country: 'India' },
        { code: '+1', country: 'USA' },
        { code: '+44', country: 'UK' },
        { code: '+971', country: 'UAE' },
        { code: '+61', country: 'Australia' },
        { code: '+65', country: 'Singapore' },
        { code: '+60', country: 'Malaysia' },
        { code: '+33', country: 'France' },
        { code: '+49', country: 'Germany' },
        { code: '+81', country: 'Japan' },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCountryChange = (e) => {
        const newCode = e.target.value;
        setSelectedCountry(newCode);
        // Replace old code or just prepend if empty. Careful not to wipe user number if they typed it without code.
        // Simple approach: Reset to new code + space
        setFormData({ ...formData, phone: `${newCode} ` });
    };

    const handleWhatsAppRedirect = () => {
        const adminNumber = "919876543210"; // Replace with actual WhatsApp Number
        const message = `
Hi SR Cinematic 👋%0A
I want to book a *${formData.shootType}* shoot.%0A
Package: *${formData.selectedPackage}*%0A
Date: ${formData.date}%0A
Location: ${formData.location}%0A
Name: ${formData.clientName}%0A
Phone: ${formData.phone}
        `.trim();

        window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 1. Send to Backend
        const stylesApiRes = await createBooking(formData);

        // 2. Redirect to WhatsApp regardless of API success (ensure conversion)
        handleWhatsAppRedirect();

        setIsSubmitting(false);
        if (stylesApiRes.booking) {
            alert("Booking Request Saved! Redirecting to WhatsApp...");
        }
    };

    return (
        <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
            <div className="booking-layout">
                <div className="booking-info animate-fade-in">
                    <h1 style={{ fontSize: '3rem', lineHeight: '1.2' }}>Let's Create <br /><span className="text-gold">Magic Together</span></h1>
                    <p className="text-muted" style={{ marginTop: '20px', fontSize: '1.1rem' }}>
                        Fill in the details below to start your cinematic journey.
                        Clicking "Book via WhatsApp" will instantly connect you with our team.
                    </p>

                    <div className="benefits-list" style={{ marginTop: '40px' }}>
                        <div className="benefit">
                            <div className="icon-box"><Phone size={20} /></div>
                            <div>
                                <h4>Instant Confirmation</h4>
                                <p className="text-muted">Direct connection with our creative director.</p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="icon-box"><Package size={20} /></div>
                            <div>
                                <h4>Tailored Packages</h4>
                                <p className="text-muted">Customized solutions for your unique event.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="booking-form-wrapper glass-card animate-fade-in">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label><User size={16} /> Client Name</label>
                            <input type="text" name="clientName" required placeholder="Enter your full name" onChange={handleChange} value={formData.clientName} />
                        </div>

                        <div className="form-group">
                            <label><Phone size={16} /> Phone Number</label>
                            <div className="phone-group">
                                <select
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                                >
                                    {COUNTRY_CODES.map((item) => (
                                        <option key={item.code} value={item.code} style={{ color: 'black' }}>
                                            {item.country} ({item.code})
                                        </option>
                                    ))}
                                </select>
                                <input type="tel" name="phone" required placeholder="98765 43210" onChange={handleChange} value={formData.phone} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><Calendar size={16} /> Date</label>
                                <input type="date" name="date" required onChange={handleChange} value={formData.date} />
                            </div>
                            <div className="form-group">
                                <label><Package size={16} /> Shoot Type</label>
                                <select name="shootType" onChange={handleChange} value={formData.shootType}>
                                    <option>Wedding</option>
                                    <option>Engagement</option>
                                    <option>Pre-Wedding</option>
                                    <option>Maternity / Baby</option>
                                    <option>Commercial</option>
                                    <option>Model Shoot</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label><MapPin size={16} /> Event Location</label>
                            <input type="text" name="location" required placeholder="City, Venue, etc." onChange={handleChange} value={formData.location} />
                        </div>

                        <div className="form-group">
                            <label>Selected Package</label>
                            <input type="text" name="selectedPackage" placeholder="e.g. Gold Package (Optional)" onChange={handleChange} value={formData.selectedPackage} />
                        </div>

                        <button type="submit" className="btn-whatsapp" disabled={isSubmitting}>
                            <MessageSquare size={20} />
                            {isSubmitting ? 'Processing...' : 'Book via WhatsApp'}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .booking-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                }
                
                @media(max-width: 900px) {
                    .booking-layout { grid-template-columns: 1fr; }
                }

                .booking-form-wrapper {
                    padding: 40px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .phone-group {
                    display: grid;
                    grid-template-columns: 120px 1fr;
                    gap: 15px;
                }

                .form-row {
                    display: flex;
                    gap: 20px;
                }

                label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    margin-bottom: 8px;
                }

                input, select {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(0, 0, 0, 0.6); /* Darker background for better contrast */
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                    font-family: var(--font-body);
                    transition: 0.2s;
                }

                input:focus, select:focus {
                    border-color: var(--primary-gold);
                    outline: none;
                    background: rgba(0, 0, 0, 0.8);
                }
                
                /* Ensure options are readable */
                option {
                    background-color: #1a1a1a;
                    color: white;
                }

                .btn-whatsapp {
                    width: 100%;
                    background: #25D366;
                    color: white;
                    font-weight: 700;
                    padding: 16px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 1.1rem;
                    transition: 0.2s;
                    margin-top: 10px;
                }

                .btn-whatsapp:hover {
                    background: #1faf53;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.3);
                }

                .benefit {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .icon-box {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--primary-gold);
                    padding: 10px;
                    border-radius: 50%;
                }
             `}</style>
        </div>
    );
};

export default BookingPage;
