const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const AWS_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;

const config: { [key: string]: any } = {
    SUPABASE_KEY,
    AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET
};

//if any env is missed, throw error

Object.keys(config).forEach((key) => {
    if (!config[key]) {
        throw new Error(`Environment variable ${key} is missing`);
    }
});

export default config;