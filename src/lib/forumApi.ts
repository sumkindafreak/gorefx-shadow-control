
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

// Fix: Correct typing and ensure required fields for ThreadWithAuthorAndReplies
export const getThreadsForCategory = async (categoryId: string): Promise<ThreadWithAuthorAndReplies[]> => {
  // This is the shape of the data returned by the RPC function for a single thread.
  type RpcThread = {
    id: string;
    created_at: string;
    title: string;
    user_id: string;
    author_full_name: string | null;
    author_avatar_url: string | null;
    reply_count: number;
    // The following are required by ThreadWithAuthor, but may not be returned by the RPC
    category_id?: string;
    content?: string;
    updated_at?: string;
  };

  // The .rpc() call is simplified. The returned `data` is of type `any`.
  // @ts-ignore - Supabase types are not generated for this RPC, causing a type error.
  const { data, error } = await supabase
    .rpc('get_threads_with_reply_count', { category_id_param: categoryId });

  if (error) throw error;
  if (!data) return [];

  // We cast the returned data to our expected type.
  const threads = data as RpcThread[];

  // Now we can safely map over the typed array.
  return threads.map((thread) => ({
    ...thread,
    profiles: {
      full_name: thread.author_full_name,
      avatar_url: thread.author_avatar_url,
    },
    author_full_name: thread.author_full_name,
    author_avatar_url: thread.author_avatar_url,
    reply_count: thread.reply_count,
    // Add fallback for required fields if missing from RPC (these are required by ThreadWithAuthorAndReplies)
    category_id: thread.category_id ?? categoryId,
    content: thread.content ?? "",
    updated_at: thread.updated_at ?? thread.created_at,
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
