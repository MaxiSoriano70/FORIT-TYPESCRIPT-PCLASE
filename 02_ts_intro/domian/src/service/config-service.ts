interface Config {
    key: string;
    value: unknown;
}

const configTest: Config = {
    key: "cotizacion",
    value: 100
}

interface DomainConfig {
    cotizacion: number;
    donationLink: string;
}

export interface ConfigService {
    getConfig: (key: keyof DomainConfig) => Promise<Config>;
    setConfig: (key: keyof DomainConfig, value: unknown) => Promise<void>;
}

/* KEYOF */
const serviceTestI: ConfigService = {
    getConfig: async (key: keyof DomainConfig) => {
        return { key, value: "ejemplo" };
    },
    setConfig: async (key: keyof DomainConfig, value: unknown) => {
        console.log(`Guardando config ${key} con valor`, value);
    }
}
