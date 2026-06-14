import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaFigma,
    FaDatabase, FaLanguage, FaMicrochip, FaCloud, FaBrain, FaChartBar
} from 'react-icons/fa';
import {
    SiTypescript, SiMongodb, SiMysql, SiTailwindcss, SiSpringboot,
    SiCplusplus, SiC, SiArduino, SiDocker, SiPython
} from 'react-icons/si';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const iconComponents = {
    html5: FaHtml5,
    css3: FaCss3Alt,
    javascript: FaJs,
    react: FaReact,
    nodejs: FaNodeJs,
    git: FaGitAlt,
    figma: FaFigma,
    typescript: SiTypescript,
    mongodb: SiMongodb,
    mysql: SiMysql,
    tailwind: SiTailwindcss,
    spring: SiSpringboot,
    cplusplus: SiCplusplus,
    c: SiC,
    arduino: SiArduino,
    language: FaLanguage,
    database: FaDatabase,
    cloud: FaCloud,
    docker: SiDocker,
    python: SiPython,
    ai: FaBrain,
    data: FaChartBar,
    default: FaMicrochip,
};

const fallbackSkills = [
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Spring Boot", icon: "spring", color: "#6DB33F" },
    { name: "Node.js", icon: "nodejs", color: "#339933" },
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "MySQL", icon: "mysql", color: "#4479A1" },
    { name: "MongoDB", icon: "mongodb", color: "#47A248" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "C++", icon: "cplusplus", color: "#00599C" },
    { name: "C", icon: "c", color: "#A8B9CC" },
    { name: "Arduino", icon: "arduino", color: "#00979D" },
    { name: "HTML5", icon: "html5", color: "#E34F26" },
    { name: "CSS3", icon: "css3", color: "#1572B6" },
    { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4" },
    { name: "Git & GitHub", icon: "git", color: "#F05032" },
    { name: "Figma", icon: "figma", color: "#F24E1E" }
];

export default function Skills({ skills }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    const skillsList = skills?.skills || fallbackSkills;
    const midIndex = Math.ceil(skillsList.length / 2);
    const row1 = skillsList.slice(0, midIndex);
    const row2 = skillsList.slice(midIndex);

    const renderSkillCard = (skill, index) => {
        const IconComponent = iconComponents[skill.icon] || iconComponents.default;
        return (
            <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 bg-[#0f1f3d]/40 backdrop-blur-md rounded-xl border border-slate-500/15 hover:border-amber-500/30 hover:bg-[#0f1f3d]/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 select-none cursor-default group"
            >
                <IconComponent 
                    className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 duration-300" 
                    style={{ color: skill.color }} 
                />
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {skill.name}
                </span>
            </div>
        );
    };

    return (
        <section id="skills" className="py-16 md:py-24 lg:py-32 bg-[#0a1628] relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-12 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-amber-500/10 text-amber-500 text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6 tracking-wider border border-amber-500/20 font-montserrat">
                        MY SKILLS
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-raleway">
                        Technologies I
                        <span className="text-amber-500 font-raleway"> Work With</span>
                    </h2>
                </div>
            </div>

            {/* Scrolling Marquees */}
            <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">
                {/* Side Fade Gradient Overlays */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0a1628] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0a1628] to-transparent z-10 pointer-events-none"></div>

                {/* Row 1: Moving Left */}
                <div className="flex overflow-hidden relative w-full">
                    <div className="flex gap-6 py-2 w-max animate-marquee hover:pause-marquee shrink-0">
                        {/* Duplicate rows side by side for seamless scrolling */}
                        {row1.map((skill, index) => renderSkillCard(skill, `r1-1-${index}`))}
                        {row1.map((skill, index) => renderSkillCard(skill, `r1-2-${index}`))}
                    </div>
                </div>

                {/* Row 2: Moving Right */}
                <div className="flex overflow-hidden relative w-full">
                    <div className="flex gap-6 py-2 w-max animate-marquee-reverse hover:pause-marquee shrink-0">
                        {/* Duplicate rows side by side for seamless scrolling */}
                        {row2.map((skill, index) => renderSkillCard(skill, `r2-1-${index}`))}
                        {row2.map((skill, index) => renderSkillCard(skill, `r2-2-${index}`))}
                    </div>
                </div>
            </div>
        </section>
    );
}
