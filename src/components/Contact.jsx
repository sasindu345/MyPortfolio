import { useState, useRef } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
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
    const { ref: formContainerRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1 });

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

        const serviceID = 'service_k0gpapy';
        const templateID = 'template_vjyjr27';
        const publicKey = 'zFI8fXH2HgQkvOS-F';

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

    const contactDetails = [
        {
            icon: FaEnvelope,
            title: 'Email Me',
            value: 'jayamadusasindu5@gmail.com',
            link: 'mailto:jayamadusasindu5@gmail.com',
        },
        {
            icon: FaPhone,
            title: 'Call Me',
            value: '+94 76 734 9531',
            link: 'tel:+94767349531',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Location',
            value: 'Sri Lanka',
            link: null,
        },
    ];

    return (
        <section id="contact" className="py-16 md:py-24 lg:py-32 bg-[#0a1628] relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#070f1d] to-[#0a1628]"></div>
            <div className="absolute top-1/2 left-0 w-48 md:w-96 h-48 md:h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-12 md:mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-amber-500/10 text-amber-500 text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6 tracking-wider border border-amber-500/20 font-montserrat">
                        GET IN TOUCH
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-raleway">
                        Let's Work
                        <span className="text-amber-500 font-raleway"> Together</span>
                    </h2>
                    <p className="text-slate-300/70 text-sm md:text-base max-w-xl mx-auto px-4 font-opensans">
                        Have a project in mind, looking for an intern, or just want to say hi? Fill out the form or contact me directly.
                    </p>
                </div>

                {/* 2-Column Container */}
                <div 
                    ref={formContainerRef} 
                    className={`grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch transition-all duration-700 delay-150 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    {/* Left Column: Contact Info Sidebar */}
                    <div className="lg:col-span-2 flex flex-col gap-6 justify-between">
                        <div className="glass-card p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-center border-slate-500/15">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-raleway">
                                Contact Information
                            </h3>
                            <p className="text-slate-300/60 text-sm md:text-base leading-relaxed font-opensans mb-4">
                                I am currently open to internships and junior developer roles in IT. Feel free to connect!
                            </p>

                            <div className="space-y-4">
                                {contactDetails.map((detail, index) => {
                                    const Icon = detail.icon;
                                    const contentNode = (
                                        <div className="flex items-center gap-4 group/item cursor-pointer">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 group-hover/item:bg-amber-500 group-hover/item:border-amber-500 transition-all duration-300">
                                                <Icon className="w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover/item:text-[#0a1628] transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-montserrat">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-200 group-hover/item:text-amber-400 transition-colors font-semibold mt-0.5">
                                                    {detail.value}
                                                </p>
                                            </div>
                                        </div>
                                    );

                                    return detail.link ? (
                                        <a key={index} href={detail.link} className="block">
                                            {contentNode}
                                        </a>
                                    ) : (
                                        <div key={index}>{contentNode}</div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 glass-card p-6 md:p-8 flex flex-col justify-between border-slate-500/15"
                    >
                        <div className="space-y-4 md:space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused('')}
                                        required
                                        disabled={sending}
                                        className="w-full px-4 md:px-5 pt-5 md:pt-5 pb-1.5 md:pb-2 bg-[#0a1628]/40 border border-slate-500/20 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-amber-500 focus:bg-[#0f1f3d]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Your Name"
                                    />
                                    <label className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none text-xs md:text-sm ${formData.name || focused === 'name'
                                        ? 'top-1 text-[10px] md:text-xs text-amber-500/80 font-bold'
                                        : 'top-3.5 text-slate-400'
                                        }`}>
                                        Your Name*
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused('')}
                                        required
                                        disabled={sending}
                                        className="w-full px-4 md:px-5 pt-5 md:pt-5 pb-1.5 md:pb-2 bg-[#0a1628]/40 border border-slate-500/20 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-amber-500 focus:bg-[#0f1f3d]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Your Email"
                                    />
                                    <label className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none text-xs md:text-sm ${formData.email || focused === 'email'
                                        ? 'top-1 text-[10px] md:text-xs text-amber-500/80 font-bold'
                                        : 'top-3.5 text-slate-400'
                                        }`}>
                                        Your Email*
                                    </label>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('phone')}
                                    onBlur={() => setFocused('')}
                                    disabled={sending}
                                    className="w-full px-4 md:px-5 pt-5 md:pt-5 pb-1.5 md:pb-2 bg-[#0a1628]/40 border border-slate-500/20 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-amber-500 focus:bg-[#0f1f3d]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Phone Number"
                                />
                                <label className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none text-xs md:text-sm ${formData.phone || focused === 'phone'
                                    ? 'top-1 text-[10px] md:text-xs text-amber-500/80 font-bold'
                                    : 'top-3.5 text-slate-400'
                                    }`}>
                                    Phone Number
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused('')}
                                    required
                                    disabled={sending}
                                    rows={4}
                                    className="w-full px-4 md:px-5 pt-5 md:pt-5 pb-1.5 md:pb-2 bg-[#0a1628]/40 border border-slate-500/20 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-transparent focus:outline-none focus:border-amber-500 focus:bg-[#0f1f3d]/30 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Your Message"
                                />
                                <label className={`absolute left-4 md:left-5 transition-all duration-300 pointer-events-none text-xs md:text-sm ${formData.message || focused === 'message'
                                    ? 'top-1 text-[10px] md:text-xs text-amber-500/80 font-bold'
                                    : 'top-3.5 text-slate-400'
                                    }`}>
                                    Your Message*
                                </label>
                            </div>

                            {/* Status Message */}
                            {status.message && (
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${status.type === 'success'
                                    ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                                    }`}>
                                    {status.type === 'success' ? (
                                        <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <span className="text-sm md:text-base font-semibold">{status.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={sending}
                                className="group w-full md:w-auto px-8 md:px-10 py-3 md:py-3.5 bg-amber-500 text-black font-bold text-sm md:text-base rounded-lg md:rounded-xl hover:bg-amber-400 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span className="font-montserrat uppercase tracking-wider">{sending ? 'Sending...' : 'Send Message'}</span>
                                <FaPaperPlane className={`w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ${sending ? 'animate-pulse' : ''}`} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
