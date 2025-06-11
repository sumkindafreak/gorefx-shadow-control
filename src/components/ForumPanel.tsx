
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { ForumLogin } from './ForumLogin';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  arrayUnion,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, ThumbsUp, LogOut, Upload } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Timestamp;
  upvotes: string[];
  replies: ForumReply[];
}

interface ForumReply {
  id: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Timestamp;
}

export const ForumPanel: React.FC = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState<{ [postId: string]: string }>({});
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'forum-posts'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ForumPost[];
        setPosts(postsData);
      });

      return unsubscribe;
    }
  }, [user]);

  if (!user) {
    return <ForumLogin />;
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    try {
      await addDoc(collection(db, 'forum-posts'), {
        title: newPostTitle,
        content: newPostContent,
        author: user.email,
        authorId: user.uid,
        timestamp: Timestamp.now(),
        upvotes: [],
        replies: []
      });

      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
      toast({ title: "Post created successfully!" });
    } catch (error) {
      toast({ title: "Error creating post", variant: "destructive" });
    }
  };

  const handleUpvote = async (postId: string) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'forum-posts', postId);
      await updateDoc(postRef, {
        upvotes: arrayUnion(user.uid)
      });
    } catch (error) {
      toast({ title: "Error upvoting post", variant: "destructive" });
    }
  };

  const handleReply = async (postId: string) => {
    const content = replyContent[postId];
    if (!content?.trim()) return;

    try {
      const newReply = {
        id: Date.now().toString(),
        content,
        author: user.email,
        authorId: user.uid,
        timestamp: Timestamp.now()
      };

      const postRef = doc(db, 'forum-posts', postId);
      await updateDoc(postRef, {
        replies: arrayUnion(newReply)
      });

      setReplyContent({ ...replyContent, [postId]: '' });
      toast({ title: "Reply posted!" });
    } catch (error) {
      toast({ title: "Error posting reply", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gore-red">🎃 HauntSync Forum</h2>
          <p className="text-gore-accent">Share scenes, effects, and horror tech</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowNewPost(!showNewPost)}
            className="horror-button"
          >
            <MessageSquare size={16} />
            New Post
          </Button>
          <Button 
            onClick={logout}
            variant="outline"
            className="border-gore-accent/50 text-gore-accent hover:bg-gore-accent/10"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">Create New Post</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="bg-gore-steel border-gore-accent/50 text-gore-text"
            />
            <textarea
              placeholder="Share your scenes, effects, or ask for help..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full h-32 bg-gore-steel border border-gore-accent/50 rounded-sm p-3 text-gore-text resize-none"
            />
            <div className="flex gap-2">
              <Button type="submit" className="horror-button">
                Post to Forum
              </Button>
              <Button 
                type="button" 
                onClick={() => setShowNewPost(false)}
                variant="outline"
                className="border-gore-accent/50 text-gore-accent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="horror-panel p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gore-text mb-1">{post.title}</h3>
                <p className="text-sm text-gore-accent">
                  by {post.author} • {post.timestamp?.toDate().toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleUpvote(post.id)}
                  size="sm"
                  variant="outline"
                  className="border-gore-accent/50 text-gore-accent hover:bg-gore-accent/10"
                  disabled={post.upvotes?.includes(user.uid)}
                >
                  <ThumbsUp size={14} />
                  {post.upvotes?.length || 0}
                </Button>
              </div>
            </div>
            
            <p className="text-gore-text mb-4">{post.content}</p>

            {/* Replies */}
            {post.replies?.length > 0 && (
              <div className="border-t border-gore-accent/30 pt-4 space-y-3">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="bg-gore-black/50 p-3 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gore-accent">{reply.author}</span>
                      <span className="text-xs text-gore-accent/60">
                        {reply.timestamp?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gore-text text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Form */}
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Write a reply..."
                value={replyContent[post.id] || ''}
                onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                className="bg-gore-steel border-gore-accent/50 text-gore-text"
              />
              <Button
                onClick={() => handleReply(post.id)}
                size="sm"
                className="horror-button"
              >
                Reply
              </Button>
            </div>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card className="horror-panel p-8 text-center">
            <p className="text-gore-accent">No posts yet. Be the first to share!</p>
          </Card>
        )}
      </div>
    </div>
  );
};
