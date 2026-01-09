import data from "../components/data.json";

export type ProfileCode = keyof typeof data.profiles | "default";

/**
 * Recursively resolves objects with { es, en } keys based on the target language.
 */
const resolveTranslations = (obj: any, lang: string): any => {
    if (Array.isArray(obj)) {
        return obj.map((item) => resolveTranslations(item, lang));
    } else if (obj !== null && typeof obj === "object") {
        // If it's a translation object, resolve it
        if (obj.es !== undefined && obj.en !== undefined) {
            return lang === "en" ? obj.en : obj.es;
        }
        // Otherwise, recurse into its properties
        const result: any = {};
        for (const key in obj) {
            result[key] = resolveTranslations(obj[key], lang);
        }
        return result;
    }
    return obj;
};

export const getProfile = (code: string | null) => {
    const profiles = data.profiles as any;
    const profile = (code && profiles[code]) ? profiles[code] : null;
    const lang = profile?.lang || "es";

    const resolvedData = resolveTranslations(data, lang);

    return {
        ...resolvedData,
        personalInfo: {
            ...resolvedData.personalInfo,
            ...(profile?.roleOverride ? { label: profile.roleOverride } : {}),
            ...(profile?.summaryOverride ? { summary: profile.summaryOverride } : {}),
            ...(profile?.showEmail === false ? { email: "" } : {})
        },
        lang,
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
                    titulo_proyectos: "Proyectos",
                    vacio: "",
                    codigo: "Código",
                    ver: "Vista previa",
                    habilidades: "Habilidades técnicas",
                    familiarizado: "Familiarizado con",
                    profesional: "Como profesional me considero",
                    hablo: "Hablo"
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
                    titulo_proyectos: "Projects",
                    vacio: "",
                    codigo: "Code",
                    ver: "Preview",
                    habilidades: "Technical skills",
                    familiarizado: "Familiar with",
                    profesional: "As a professional I consider myself",
                    hablo: "I speak"
                }
            };
            return translations[lang][key] || key;
        }
    };
};
