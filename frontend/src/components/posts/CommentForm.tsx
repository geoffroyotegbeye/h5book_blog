import { useState, FormEvent, ChangeEvent } from 'react';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  isReply?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  placeholder = "Ajouter un commentaire...", 
  isReply = false 
}) => {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-2 ${isReply ? 'ml-12' : ''}`}>
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:opacity-30"
            >
              {isReply ? 'Répondre' : 'Commenter'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
