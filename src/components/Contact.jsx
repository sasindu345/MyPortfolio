import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [focused, setFocused] = useState('');
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:sasindu@example.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
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
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
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
                                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer"
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
                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer"
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
                            rows={4}
                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-white/50 transition-colors resize-none peer"
                            placeholder="Your Message"
                        />
                        <label className={`absolute left-4 md:left-6 transition-all duration-300 pointer-events-none text-sm md:text-base ${formData.message || focused === 'message'
                                ? 'top-0.5 md:top-1 text-[10px] md:text-xs text-white/70'
                                : 'top-3 md:top-4 text-white/40'
                            }`}>
                            Your Message*
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="group w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-black font-bold text-sm md:text-base rounded-lg md:rounded-xl hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                    >
                        <span>Send Message</span>
                        <FaPaperPlane className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </div>
        </section>
    );
}
