
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert } from "@/integrations/supabase/types";

export type ThreadWithAuthor = Tables<'forum_threads'> & {
  profiles: Pick<Tables<'profiles'>, 'full_name' | 'avatar_url'> | null;
};

export type ThreadWithAuthorAndReplies = ThreadWithAuthor & {
  reply_count: number;
  author_full_name: string | null;
  author_avatar_url: string | null;
}

export type ReplyWithAuthor = Tables<'forum_replies'> & {
  profiles: Pick<Tables<'profiles'>, 'full_name' | 'avatar_url'> | null;
};

export const getCategories = async () => {
  const { data, error } = await supabase.from('forum_categories').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getCategory = async (id: string) => {
    const { data, error } = await supabase.from('forum_categories').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const getThreadsForCategory = async (categoryId: string): Promise<ThreadWithAuthorAndReplies[]> => {
    const { data, error } = await supabase
      .rpc('get_threads_with_reply_count', { category_id_param: categoryId });

    if (error) throw error;
    
    if (!data) return [];
    
    // The rpc function will return threads with profiles and reply_count
    return data.map((thread: any) => ({
      ...thread,
      profiles: {
        full_name: thread.author_full_name,
        avatar_url: thread.author_avatar_url
      }
    }));
};

export const getThreadWithReplies = async (threadId: string) => {
    const threadPromise = supabase
        .from('forum_threads')
        .select('*, profiles(full_name, avatar_url)')
        .eq('id', threadId)
        .single();

    const repliesPromise = supabase
        .from('forum_replies')
        .select('*, profiles(full_name, avatar_url)')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

    const [{ data: threadData, error: threadError }, { data: repliesData, error: repliesError }] = await Promise.all([threadPromise, repliesPromise]);

    if (threadError) throw threadError;
    if (repliesError) throw repliesError;

    return { thread: threadData as ThreadWithAuthor, replies: repliesData as ReplyWithAuthor[] };
};

export const createThread = async (threadData: TablesInsert<'forum_threads'>) => {
    const { data, error } = await supabase.from('forum_threads').insert(threadData).select().single();
    if (error) throw error;
    return data;
};

export const createReply = async (replyData: TablesInsert<'forum_replies'>) => {
    const { data, error } = await supabase.from('forum_replies').insert(replyData).select().single();
    if (error) throw error;
    return data;
};
