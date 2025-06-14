
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getThreadWithReplies, createReply, ReplyWithAuthor } from "@/lib/forumApi";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const replySchema = z.object({
  content: z.string().min(1, "Reply cannot be empty."),
});

const ForumThread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [replies, setReplies] = useState<ReplyWithAuthor[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['forum_thread', threadId],
    queryFn: () => getThreadWithReplies(threadId!),
    enabled: !!threadId,
  });

  useEffect(() => {
    if (data?.replies) {
      setReplies(data.replies);
    }
  }, [data]);

  useEffect(() => {
    if (!threadId) return;

    const channel = supabase
      .channel(`forum-thread-${threadId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'forum_replies', filter: `thread_id=eq.${threadId}` },
        async (payload) => {
          const newReplyData = payload.new as Tables<'forum_replies'>;
          // Fetch the full reply data including author profile
          const { data: newReply, error } = await supabase
            .from('forum_replies')
            .select('*, profiles(full_name, avatar_url)')
            .eq('id', newReplyData.id)
            .single();
            
          if (error) {
            console.error("Error fetching new reply:", error);
            return;
          }

          if (newReply && !replies.some(r => r.id === newReply.id)) {
             setReplies(currentReplies => [...currentReplies, newReply as ReplyWithAuthor]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, queryClient, replies]);

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: { content: "" },
  });

  const mutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      toast.success("Reply posted!");
      form.reset();
      // Realtime update will handle UI change, but we can also invalidate for fallback
      queryClient.invalidateQueries({ queryKey: ['forum_threads', data?.thread.category_id] });
    },
    onError: (error) => {
      toast.error(`Failed to post reply: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof replySchema>) => {
    if (!user || !threadId) {
      toast.error("You must be logged in to reply.");
      return;
    }
    mutation.mutate({
      content: values.content,
      thread_id: threadId,
      user_id: user.id,
    });
  };

  const thread = data?.thread;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <main className="flex-1 space-y-6">
              {thread && (
                <Link to={`/forum/category/${thread.category_id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft size={16} />
                  Back to threads
                </Link>
              )}
              {isLoading && <Card><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>}
              {isError && <p className="text-destructive">Error: {error?.message}</p>}
              
              {thread && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-spectral">{thread.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={thread.profiles?.avatar_url || ''} alt={thread.profiles?.full_name || ''} />
                        <AvatarFallback>{thread.profiles?.full_name?.charAt(0) || 'A'}</AvatarFallback>
                      </Avatar>
                      <span>{thread.profiles?.full_name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>{format(new Date(thread.created_at), "PPP")}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                    {thread.content}
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.profiles?.avatar_url || ''} alt={reply.profiles?.full_name || ''}/>
                          <AvatarFallback>{reply.profiles?.full_name?.charAt(0) || 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{reply.profiles?.full_name || 'Anonymous'}</p>
                          <p className="text-xs text-muted-foreground">{format(new Date(reply.created_at), "Pp")}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {user ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Post a Reply</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sr-only">Your Reply</FormLabel>
                              <FormControl>
                                <Textarea rows={4} placeholder="Write your reply..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={mutation.isPending}>
                          {mutation.isPending ? "Posting..." : "Post Reply"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center p-6">
                  <p>
                    <Link to="/auth" className="text-primary underline">Log in</Link> or <Link to="/auth" className="text-primary underline">sign up</Link> to post a reply.
                  </p>
                </Card>
              )}
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ForumThread;
