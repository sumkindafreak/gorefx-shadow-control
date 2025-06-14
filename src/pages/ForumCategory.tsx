
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getThreadsForCategory, getCategory } from "@/lib/forumApi";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MessageSquare } from "lucide-react";
import NewThreadDialog from "@/components/forum/NewThreadDialog";
import { useAuth } from "@/contexts/AuthContext";

const ForumCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { user } = useAuth();
  
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['forum_category', categoryId],
    queryFn: () => getCategory(categoryId!),
    enabled: !!categoryId,
  });

  const { data: threads, isLoading: isLoadingThreads, isError } = useQuery({
    queryKey: ['forum_threads', categoryId],
    queryFn: () => getThreadsForCategory(categoryId!),
    enabled: !!categoryId,
  });

  const isLoading = isLoadingCategory || isLoadingThreads;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <main className="flex-1 space-y-6">
              <Link to="/forum" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft size={16} />
                Back to categories
              </Link>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold font-spectral">{isLoading ? <Skeleton className="h-8 w-64" /> : category?.name}</h1>
                  <p className="text-muted-foreground mt-1">{isLoading ? <Skeleton className="h-5 w-96" /> : category?.description}</p>
                </div>
                {user && categoryId && <NewThreadDialog categoryId={categoryId} />}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Threads</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading && <div className="space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>}
                  {isError && <p className="text-destructive">Failed to load threads.</p>}
                  {!isLoading && !isError && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60%]">Topic</TableHead>
                          <TableHead className="text-center">Replies</TableHead>
                          <TableHead className="text-right">Last Activity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {threads && threads.length > 0 ? (
                          threads.map((thread) => (
                            <TableRow key={thread.id}>
                              <TableCell>
                                <Link to={`/forum/thread/${thread.id}`} className="font-semibold hover:underline">{thread.title}</Link>
                                <p className="text-sm text-muted-foreground">by {thread.author_full_name || 'Anonymous'}</p>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <MessageSquare size={16} /> {thread.reply_count}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">{formatDistanceToNow(new Date(thread.created_at))} ago</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">No threads yet. Be the first to start a discussion!</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ForumCategory;
