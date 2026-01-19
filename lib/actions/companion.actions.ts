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
export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient(); //instace of supabase

    const { data, error } = await supabase    //fetch from current DB history 
        .from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if (error) throw new Error(error.message)
    return data;
}

/*
    Method for getting all recent session for each specific id
*/
export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('companions:companion_id(*)') //companions with specific companion id
        .order('created_at', { ascending: false }) // descending from newest to oldest
        .limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions);
}


/*
    Method for getting all recent session for each specific user
*/
export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('companions:companion_id(*)') //companions with specific companion id
        .eq('user_id', userId)
        .order('created_at', { ascending: false }) // descending from newest to oldest
        .limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions);
}
