import { useState } from "react";
import { Heart, MessageCircle, PlaySquare, Send, Users } from "lucide-react";

import Card from "./Card";

function CommunityCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  return (
    <Card className="community-card">
      <div className="post-head">
        <div className="avatar">{post.author.slice(0, 2)}</div>
        <div>
          <h3>{post.author}</h3>
          <span>{post.badge}</span>
        </div>
      </div>
      <p>{post.text}</p>
      <div className="fake-video">
        <PlaySquare size={20} />
        {post.video}
      </div>
      <div className="post-actions">
        <button onClick={() => setLikes((current) => current + 1)} type="button">
          <Heart size={14} />
          Curtir {likes}
        </button>
        <button onClick={() => setComments((current) => current + 1)} type="button">
          <MessageCircle size={14} />
          Comentar {comments}
        </button>
        <span>
          <Users size={14} />
          {post.group}
        </span>
      </div>
      <div className="fake-comment">
        <Send size={13} />
        Comentário fake enviado no feed
      </div>
    </Card>
  );
}

export default CommunityCard;
