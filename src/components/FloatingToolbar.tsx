import { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bold, 
  Italic, 
  Link, 
  Code, 
  Quote, 
  List, 
  ListOrdered,
  Sparkles,
  X
} from 'lucide-react';

interface FloatingToolbarProps {
  editor: Editor;
  onAIAssist: (prompt: string) => void;
}

const FloatingToolbar = ({ editor, onAIAssist }: FloatingToolbarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showAIInput, setShowAIInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    const updateToolbar = () => {
      const { from, to } = editor.state.selection;

      if (from === to) {
        setIsVisible(false);
        setShowAIInput(false);
        return;
      }

      try {
        // Get the coordinates of the selection start
        const coords = editor.view.coordsAtPos(from);
        
        // Get the editor container for relative positioning
        const editorRect = editor.view.dom.getBoundingClientRect();
        
        // Calculate position relative to the editor container
        const relativeX = coords.left - editorRect.left + (coords.right - coords.left) / 2;
        const relativeY = coords.top - editorRect.top;

        setPosition({
          x: relativeX,
          y: relativeY
        });
        
        setIsVisible(true);
      } catch (error) {
        setIsVisible(false);
      }
    };

    editor.on('selectionUpdate', updateToolbar);
    editor.on('focus', updateToolbar);
    editor.on('blur', () => {
      setIsVisible(false);
      setShowAIInput(false);
    });

    return () => {
      editor.off('selectionUpdate', updateToolbar);
      editor.off('focus', updateToolbar);
      editor.off('blur', () => {
        setIsVisible(false);
        setShowAIInput(false);
      });
    };
  }, [editor]);

  const handleAISubmit = () => {
    if (aiPrompt.trim()) {
      onAIAssist(aiPrompt);
      setAiPrompt('');
      setShowAIInput(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="absolute z-50 bg-background border border-border rounded-lg shadow-lg p-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 50}px`,
        transform: 'translateX(-50%)'
      }}
    >
      {!showAIInput ? (
        <div className="flex items-center gap-1">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
          >
            <Bold className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <Italic className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('code') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleCode().run();
            }}
          >
            <Code className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
            }}
          >
            <Quote className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
          >
            <List className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAIInput(true)}
            className="text-primary hover:text-primary"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2">
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI to help with this text..."
            className="w-64"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAISubmit();
              } else if (e.key === 'Escape') {
                setShowAIInput(false);
                setAiPrompt('');
              }
            }}
            autoFocus
          />
          <Button size="sm" onClick={handleAISubmit}>
            <Sparkles className="w-4 h-4 mr-1" />
            Ask AI
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowAIInput(false);
              setAiPrompt('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FloatingToolbar;
