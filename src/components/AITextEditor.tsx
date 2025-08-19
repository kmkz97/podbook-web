import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Undo,
  Redo,
  Save,
  Sparkles,
  Eye,
  Download,
  Share2,
  Settings,
  Plus
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
      Placeholder.configure({
        placeholder: 'Start writing your chapter content...',
      }),
      Highlight,
      Typography,
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
    <div className="flex h-screen bg-background">
      {/* Left Chapter Navigation */}
      <aside className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground mb-2">{projectTitle}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{chapters.length} chapters</span>
            <span>{totalWords.toLocaleString()} words</span>
            <span>~{totalPages} pages</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  chapter.isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setActiveChapter(chapter)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{chapter.title}</h3>
                  <Badge variant={chapter.isActive ? 'secondary' : 'outline'} className="text-xs">
                    {chapter.wordCount} words
                  </Badge>
                </div>
                <p className={`text-sm ${chapter.isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  ~{chapter.estimatedPages} pages
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Chapter
          </Button>
        </div>
      </aside>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            {/* Left: Project Info */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-lg font-bold text-foreground">Tech News Weekly Digest</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>5 chapters</span>
                  <span>14 words</span>
                  <span>~28 pages</span>
                </div>
              </div>
            </div>

            {/* Middle: Formatting Tools */}
            <div className="flex items-center gap-2">
              <Button
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                <Heading1 className="w-4 h-4" />
              </Button>
              <Button
                variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                <Heading2 className="w-4 h-4" />
              </Button>
              <Button
                variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                <Heading3 className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button
                variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="w-4 h-4" />
              </Button>
            </div>

            {/* Right: Action Tools */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="outline"
                size="sm"
                onClick={getAIAssistance}
                disabled={isAIAssisting}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isAIAssisting ? 'AI Thinking...' : 'AI Assist'}
              </Button>
              <Button variant="outline" size="sm" onClick={saveChapter}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <EditorContent 
              editor={editor} 
              className="prose prose-lg max-w-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITextEditor;
