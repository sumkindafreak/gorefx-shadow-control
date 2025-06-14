
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/forumApi";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

const Forum = () => {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['forum_categories'],
    queryFn: getCategories
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <main className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-spectral">Forum Categories</h1>
              </div>

              {isLoading && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                </div>
              )}
              {isError && <p className="text-destructive">Failed to load categories.</p>}

              <div className="grid gap-4 md:grid-cols-2">
                {categories?.map((category) => (
                  <Link to={`/forum/category/${category.id}`} key={category.id} className="block">
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                      <CardHeader className="flex flex-row items-start gap-4">
                        <MessageSquare className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <CardTitle className="font-spectral">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Forum;
