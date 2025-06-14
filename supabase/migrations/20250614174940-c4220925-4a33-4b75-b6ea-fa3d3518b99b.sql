
-- Create forum categories table
CREATE TABLE public.forum_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum threads table
CREATE TABLE public.forum_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum replies table
CREATE TABLE public.forum_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS for forum_categories
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to categories" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to create categories" ON public.forum_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to update/delete categories" ON public.forum_categories FOR ALL USING (
  (SELECT COALESCE((SELECT tier FROM public.subscriptions WHERE user_id = auth.uid() AND status = 'active'), 'standard')) = 'full_access'
);


-- RLS for forum_threads
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to threads" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to create threads" ON public.forum_threads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owners to update their threads" ON public.forum_threads FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow owners to delete their threads" ON public.forum_threads FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow admins to delete threads" ON public.forum_threads FOR DELETE USING (
  (SELECT COALESCE((SELECT tier FROM public.subscriptions WHERE user_id = auth.uid() AND status = 'active'), 'standard')) = 'full_access'
);


-- RLS for forum_replies
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to create replies" ON public.forum_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owners to update their replies" ON public.forum_replies FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow owners to delete their replies" ON public.forum_replies FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow admins to delete replies" ON public.forum_replies FOR DELETE USING (
  (SELECT COALESCE((SELECT tier FROM public.subscriptions WHERE user_id = auth.uid() AND status = 'active'), 'standard')) = 'full_access'
);

-- Seed some categories
INSERT INTO public.forum_categories (name, description) VALUES
('General Discussion', 'Talk about anything and everything related to HauntSync and Showduino.'),
('Show Off', 'Share your amazing shows and get feedback from the community.'),
('Technical Support', 'Need help with setup or troubleshooting? Ask here.'),
('Feature Requests', 'Have a great idea for a new feature? Let us know!');

-- Set replica identity for realtime
ALTER TABLE public.forum_categories REPLICA IDENTITY FULL;
ALTER TABLE public.forum_threads REPLICA IDENTITY FULL;
ALTER TABLE public.forum_replies REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_threads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_replies;
