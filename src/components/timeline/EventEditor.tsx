
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TimelineEvent } from './types';
import { Textarea } from '@/components/ui/textarea';

interface EventEditorProps {
  eventInfo: { trackId: string; event: TimelineEvent } | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (trackId: string, event: TimelineEvent) => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  start: z.coerce.number().min(0, 'Start time must be non-negative.'),
  duration: z.coerce.number().min(0.1, 'Duration must be at least 0.1s.'),
  command: z.string().optional(),
});

const EventEditor: React.FC<EventEditorProps> = ({ eventInfo, isOpen, onClose, onSave }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      start: 0,
      duration: 1,
      command: '',
    },
  });

  useEffect(() => {
    if (eventInfo) {
      form.reset(eventInfo.event);
    }
  }, [eventInfo, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!eventInfo) return;
    onSave(eventInfo.trackId, { ...eventInfo.event, ...values });
  };

  if (!eventInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Main Riff" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Command Line</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. LIGHTS_ON, PLAY_SOUND --file siren.mp3"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditor;
