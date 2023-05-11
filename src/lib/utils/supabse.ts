import { createClient } from '@supabase/supabase-js'

let PUBLIC_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cHN0cHZlZWRhbXRweHFjc2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4Mjc2MjUsImV4cCI6MTk5OTQwMzYyNX0.EmLl5dKlr9cU57BjZCAXZjsrHSZuaCpItSNHS_VHXks"
let PUBLIC_SUPABASE_URL = "https://gxpstpveedamtpxqcsbd.supabase.co"

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export const login = async (name: string, password: string) => {
    let user = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .eq("password", password);

    return user;
}

export const getExercises = async () => {
    let {data} = await supabase
    .from('exercises')
    .select('*')

    return data;
}


export const uploadFile = async (file, name) => {
    const { data, error } = await supabase
        .storage
        .from('exercises')
        .upload(name, file, {
            cacheControl: '3600',
            upsert: true
    })

    if (data.path) {
        let resp = await supabase
        .from('exercises')
        .insert({
            name: name,
            graded: false,
            difficulty: "EASY"
        })
        .select('*');

        return resp.data;
    }

    return null;
}

export const getExo = async (name: string) => {
    const { data, error } = await supabase
        .storage
        .from('exercises')
        .download(name);
    
        return data;
}