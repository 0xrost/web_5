import { useEffect, useState } from 'react';
import { COMMENTS_URL } from '../config';

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(COMMENTS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError('Could not load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, []);

  return (
    <section id="reviews">
      <h2>Reviews from Previous Employers</h2>
      {loading && <p role="status">Loading reviews…</p>}
      {error && <p className="form-status-error">{error}</p>}
      <ul id="reviews-list">
        {comments.map((comment) => (
          <li key={comment.id} className="review-card">
            <h3>{comment.name}</h3>
            <a className="review-author" href={`mailto:${comment.email}`}>
              {comment.email}
            </a>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Reviews;
