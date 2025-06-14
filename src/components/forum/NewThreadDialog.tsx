
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/lib/forumApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

const threadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(100, "Title cannot be more than 100 characters."),
  content: z.string().min(10, "Content must be at least 10 characters long."),
});

type NewThreadDialogProps = {
  categoryId: string;
};

const NewThreadDialog = ({ categoryId }: NewThreadDialogProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: { title: "", content: "" },
  });

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      toast.success("Thread created successfully!");
      queryClient.invalidateQueries({ queryKey: ['forum_threads', categoryId] });
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(`Failed to create thread: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof threadSchema>) => {
    if (!user) {
      toast.error("You must be logged in to create a thread.");
      return;
    }
    mutation.mutate({
      ...values,
      category_id: categoryId,
      user_id: user.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start a New Discussion</DialogTitle>
          <DialogDescription>
            Share your thoughts with the community. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a descriptive title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Explain your topic in detail..." rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Submitting..." : "Submit Thread"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewThreadDialog;
