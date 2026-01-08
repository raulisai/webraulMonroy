import data from "../components/data.json";

export type ProfileCode = keyof typeof data.profiles | "default";

export const getProfile = (code: string | null) => {
    const profiles = data.profiles as any;
    const profile = (code && profiles[code]) ? profiles[code] : null;

    return {
        ...data,
        personalInfo: {
            ...data.personalInfo,
            ...(profile?.roleOverride ? { label: profile.roleOverride } : {}),
            ...(profile?.summaryOverride ? { summary: profile.summaryOverride } : {}),
            ...(profile?.showEmail === false ? { email: "" } : {})
        },
        lang: profile?.lang || "es",
        t: (key: string) => {
            const translations: any = {
                es: {
                    experiencia: "Experiencia",
                    proyectos: "Proyectos",
                    sobremi: "Sobre mí",
                    contacto: "Contacto",
                    disponible: "Disponible para trabajar",
                    contactame: "Contáctame",
                    sabermas: "Saber más",
                    experiencialaboral: "Experiencia laboral",
                    titulo_proyectos: "Proyectos"
                },
                en: {
                    experiencia: "Experience",
                    proyectos: "Projects",
                    sobremi: "About me",
                    contacto: "Contact",
                    disponible: "Available for work",
                    contactame: "Contact me",
                    sabermas: "Learn more",
                    experiencialaboral: "Work Experience",
                    titulo_proyectos: "Projects"
                }
            };
            const lang = profile?.lang || "es";
            return translations[lang][key] || key;
        }
    };
};
