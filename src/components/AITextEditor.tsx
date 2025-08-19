import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Image from '@tiptap/extension-image';
import Mention from '@tiptap/extension-mention';
import FloatingToolbar from './FloatingToolbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  Undo, Redo, Save, Sparkles, Eye, Download, Share2, Settings, Plus
} from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  wordCount: number;
  estimatedPages: number;
  content: string;
  isActive: boolean;
}

interface AITextEditorProps {
  projectId: string;
  projectTitle: string;
}

const AITextEditor = ({ projectId, projectTitle }: AITextEditorProps) => {
  console.log('AITextEditor component rendered with:', { projectId, projectTitle });
  
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: '1',
      title: 'Introduction',
      wordCount: 1200,
      estimatedPages: 4,
      content: 'Welcome to this comprehensive guide...',
      isActive: true
    },
    {
      id: '2',
      title: 'Getting Started',
      wordCount: 1800,
      estimatedPages: 6,
      content: 'To begin your journey...',
      isActive: false
    },
    {
      id: '3',
      title: 'Core Concepts',
      wordCount: 2400,
      estimatedPages: 8,
      content: 'The fundamental principles...',
      isActive: false
    },
    {
      id: '4',
      title: 'Advanced Topics',
      wordCount: 2000,
      estimatedPages: 7,
      content: 'For experienced users...',
      isActive: false
    },
    {
      id: '5',
      title: 'Conclusion',
      wordCount: 800,
      estimatedPages: 3,
      content: 'In summary...',
      isActive: false
    }
  ]);

  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapters[0]);
  const [isAIAssisting, setIsAIAssisting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your chapter content...' }),
      Highlight,
      Typography,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg'
        }
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'bg-primary/10 text-primary px-1 rounded'
        }
      })
    ],
    content: currentChapter.content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setChapters(prev => prev.map(ch =>
        ch.id === currentChapter.id
          ? { ...ch, content: newContent, wordCount: editor.getText().split(/\s+/).length }
          : ch
      ));
    },
  });

  console.log('TipTap editor created:', editor);

  const setActiveChapter = useCallback((chapter: Chapter) => {
    setCurrentChapter(chapter);
    setChapters(prev => prev.map(ch => ({ ...ch, isActive: ch.id === chapter.id })));
    if (editor) {
      editor.commands.setContent(chapter.content);
    }
  }, [editor]);

  const saveChapter = useCallback(() => {
    if (editor) {
      const newContent = editor.getHTML();
      setChapters(prev => prev.map(ch =>
        ch.id === currentChapter.id
          ? { ...ch, content: newContent, wordCount: editor.getText().split(/\s+/).length }
          : ch
      ));
    }
  }, [editor, currentChapter.id]);

  const getAIAssistance = useCallback(async () => {
    setIsAIAssisting(true);
    // Simulate AI assistance
    setTimeout(() => {
      if (editor) {
        const currentText = editor.getText();
        const aiSuggestion = `\n\n[AI Suggestion: Consider expanding on this topic with more examples and practical applications. You might want to add a section about common challenges and solutions.]`;
        editor.commands.insertContent(aiSuggestion);
      }
      setIsAIAssisting(false);
    }, 2000);
  }, [editor]);

  const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
  const totalPages = chapters.reduce((sum, ch) => sum + ch.estimatedPages, 0);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold">AITextEditor - {projectTitle}</h1>
        <p>Project ID: {projectId}</p>
        <p>This is a test to see if the component renders</p>
        <div className="p-4 bg-green-100 border border-green-500 mt-4">
          <p>Debug: AITextEditor component is rendering!</p>
          <p>Timestamp: {new Date().toISOString()}</p>
        </div>
      </div>
      <div className="flex-1 p-8">
        <p>Editor content would go here...</p>
      </div>
    </div>
  );
};

export default AITextEditor;
