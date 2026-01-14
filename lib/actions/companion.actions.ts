'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient(); //user in the database

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData,author})
        .select();
    
    if(error || !data) throw new Error(error.message || 'Failed to create companion');

    return data[0];
}

export const getAllCompanions = async ({limit = 10, page = 1, subject, topic}: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if(subject && topic){//search for the topic whether within the name or topic field
        query = query.ilike('subject', `%${subject}%`)//any mention of subject within the subject
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);// search it within the topic
    }else if (subject){
        query = query.ilike('subject', `%${subject}%`);
    }else if (topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);//
    }
    //pagination
    query = query.range((page - 1) * limit, page * limit - 1);
    
    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id)
        .single();
    
    if(error) return console.log(error);
    
    return data;
}