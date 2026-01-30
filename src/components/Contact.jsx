import { useState, useRef } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [focused, setFocused] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const formRef = useRef();

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: formContainerRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus({ type: '', message: '' });

        // IMPORTANT: Replace these with your EmailJS credentials
        // Get them from: https://www.emailjs.com/
        const serviceID = 'service_k0gpapy';  // Replace with your EmailJS Service ID
        const templateID = 'template_vjyjr27'; // Replace with your EmailJS Template ID
        const publicKey = 'zFI8fXH2HgQkvOS-F';   // Replace with your EmailJS Public Key

        try {
            const result = await emailjs.sendForm(
                serviceID,
                templateID,
                formRef.current,
                publicKey
            );

            console.log('Email sent successfully:', result.text);
            setStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again or email me directly.'
            });
        } finally {
            setSending(false);
            // Clear status message after 5 seconds
            setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 5000);
        }
    };

    const inputFields = [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'email', label: 'Your Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    ];

    return (
        <section id="contact" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950"></div>
            <div className="absolute top-1/2 left-0 w-48 md:w-96 h-48 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-white/3 rounded-full blur-3xl -translate-y-1/2"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-10 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-white/10 text-white/80 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 tracking-wider border border-white/20">
                        GET IN TOUCH
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Let's Work
                        <span className="text-white/60"> Together</span>
                    </h2>
                    <p className="text-white/50 text-sm md:text-lg max-w-xl mx-auto px-4">
                        Have a project in mind? Let's discuss how we can bring your ideas to life.
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={`max-w-2xl mx-auto px-2 transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div ref={formContainerRef} className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        {inputFields.slice(0, 2).map((field, index) => (
                            <div
                                key={field.name}
                                className="relative"
                                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                            >
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    onFocus={() => setFocused(field.name)}
                                    onBlur={() => setFocused('')}
                                    required={field.required}
                                    disabled={sending}
                                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder={field.label}
                                />
                                <label className={`absolute left-4 md:left-6 transition-all duration-300 pointer-events-none text-sm md:text-base ${formData[field.name] || focused === field.name
                                    ? 'top-0.5 md:top-1 text-[10px] md:text-xs text-white/70'
                                    : 'top-3 md:top-4 text-white/40'
                                    }`}>
                                    {field.label}{field.required && '*'}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="relative mb-4 md:mb-6">
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused('')}
                            disabled={sending}
                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Phone Number"
                        />
                        <label className={`absolute left-4 md:left-6 transition-all duration-300 pointer-events-none text-sm md:text-base ${formData.phone || focused === 'phone'
                            ? 'top-0.5 md:top-1 text-[10px] md:text-xs text-white/70'
                            : 'top-3 md:top-4 text-white/40'
                            }`}>
                            Phone Number
                        </label>
                    </div>

                    <div className="relative mb-6 md:mb-8">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused('')}
                            required
                            disabled={sending}
                            rows={4}
                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors resize-none peer disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Your Message"
                        />
                        <label className={`absolute left-4 md:left-6 transition-all duration-300 pointer-events-none text-sm md:text-base ${formData.message || focused === 'message'
                            ? 'top-0.5 md:top-1 text-[10px] md:text-xs text-white/70'
                            : 'top-3 md:top-4 text-white/40'
                            }`}>
                            Your Message*
                        </label>
                    </div>

                    {/* Status Message */}
                    {status.message && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success'
                            ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                            : 'bg-red-500/10 border border-red-500/30 text-red-300'
                            }`}>
                            {status.type === 'success' ? (
                                <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                            ) : (
                                <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <span className="text-sm md:text-base">{status.message}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={sending}
                        className="group w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-black font-bold text-sm md:text-base rounded-lg md:rounded-xl hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <span>{sending ? 'Sending...' : 'Send Message'}</span>
                        <FaPaperPlane className={`w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${sending ? 'animate-pulse' : ''}`} />
                    </button>
                </form>
            </div>
        </section>
    );
}
