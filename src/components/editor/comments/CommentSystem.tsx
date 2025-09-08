import React, { useState, useCallback } from 'react';
import { useEditor } from '../EditorProvider';

interface Comment {
  id: string;
  blockId?: string;
  stepKey?: string;
  text: string;
  timestamp: Date;
  author: string;
}

interface CommentSystemProps {
  blockId?: string;
  stepKey?: string;
  className?: string;
}

/**
 * Comment System - Read-only annotation system that does NOT trigger editing
 * 
 * Key principle: Comments are pure annotations and should never modify editor state
 * or trigger editing functionality. They exist in a separate layer from the editing system.
 */
export const CommentSystem: React.FC<CommentSystemProps> = ({ 
  blockId, 
  stepKey, 
  className = '' 
}) => {
  const { state } = useEditor();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Generate a unique comment ID without affecting editor state
  const generateCommentId = useCallback(() => {
    return `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add comment - IMPORTANT: This does NOT trigger any editing functionality
  const addComment = useCallback(() => {
    if (!newCommentText.trim()) return;

    const comment: Comment = {
      id: generateCommentId(),
      blockId,
      stepKey,
      text: newCommentText.trim(),
      timestamp: new Date(),
      author: 'User' // In a real system, this would come from auth context
    };

    // Only update comment state, NOT editor state
    setComments(prev => [...prev, comment]);
    setNewCommentText('');
    setIsAddingComment(false);

    console.log('✅ Comment added (no editing triggered):', comment);
  }, [newCommentText, blockId, stepKey, generateCommentId]);

  // Delete comment - Again, does NOT affect editor state
  const deleteComment = useCallback((commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    console.log('✅ Comment deleted (no editing triggered):', commentId);
  }, []);

  return (
    <div className={`comment-system border-l-2 border-blue-200 pl-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-sm font-medium text-blue-600">Comentários</span>
        <span className="text-xs text-gray-500">
          (Apenas anotações - não editam conteúdo)
        </span>
      </div>

      {/* List existing comments */}
      <div className="space-y-2 mb-3">
        {comments.map(comment => (
          <div key={comment.id} className="bg-blue-50 p-2 rounded text-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-800">{comment.text}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {comment.author} • {comment.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-400 hover:text-red-600 ml-2"
                title="Deletar comentário"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new comment */}
      {isAddingComment ? (
        <div className="space-y-2">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Adicione um comentário..."
            className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={addComment}
              disabled={!newCommentText.trim()}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Adicionar
            </button>
            <button
              onClick={() => {
                setIsAddingComment(false);
                setNewCommentText('');
              }}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingComment(true)}
          className="w-full p-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
        >
          + Adicionar comentário
        </button>
      )}

      {/* Debug info - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div>Step: {stepKey || 'none'}</div>
          <div>Block: {blockId || 'none'}</div>
          <div>Editor Step: {state.currentStep}</div>
          <div>Comments: {comments.length}</div>
        </div>
      )}
    </div>
  );
};

export default CommentSystem;