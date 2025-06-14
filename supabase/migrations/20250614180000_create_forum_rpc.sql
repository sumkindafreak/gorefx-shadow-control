
CREATE OR REPLACE FUNCTION get_threads_with_reply_count(category_id_param UUID)
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMPTZ,
  title TEXT,
  user_id UUID,
  author_full_name TEXT,
  author_avatar_url TEXT,
  reply_count BIGINT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ft.id,
    ft.created_at,
    ft.title,
    ft.user_id,
    p.full_name as author_full_name,
    p.avatar_url as author_avatar_url,
    (SELECT COUNT(*) FROM public.forum_replies fr WHERE fr.thread_id = ft.id) as reply_count
  FROM
    public.forum_threads ft
  JOIN
    public.profiles p ON ft.user_id = p.id
  WHERE
    ft.category_id = category_id_param
  ORDER BY
    ft.created_at DESC;
END;
$$ LANGUAGE plpgsql;
