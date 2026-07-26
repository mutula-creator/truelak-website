'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const MenuBar = ({ editor }) => {
  if (!editor) return null;
  const btn = (action, label, active) => (
    <button type="button" onClick={action}
      style={{
        padding:'4px 10px', margin:'2px', border:'1px solid #ddd',
        borderRadius:'4px', cursor:'pointer', fontSize:'13px',
        background: active ? '#0B1F3A' : '#fff',
        color: active ? '#fff' : '#374151',
        fontWeight: active ? 700 : 400,
      }}>
      {label}
    </button>
  );
  return (
    <div style={{padding:'8px',borderBottom:'1px solid #E5E7EB',display:'flex',flexWrap:'wrap',gap:'2px',background:'#F9FAFB',borderRadius:'8px 8px 0 0'}}>
      {btn(() => editor.chain().focus().toggleBold().run(), 'Bold', editor.isActive('bold'))}
      {btn(() => editor.chain().focus().toggleItalic().run(), 'Italic', editor.isActive('italic'))}
      {btn(() => editor.chain().focus().toggleUnderline().run(), 'Underline', editor.isActive('underline'))}
      <span style={{width:'1px',background:'#E5E7EB',margin:'0 4px'}}/>
      {btn(() => editor.chain().focus().toggleHeading({level:2}).run(), 'H2', editor.isActive('heading',{level:2}))}
      {btn(() => editor.chain().focus().toggleHeading({level:3}).run(), 'H3', editor.isActive('heading',{level:3}))}
      <span style={{width:'1px',background:'#E5E7EB',margin:'0 4px'}}/>
      {btn(() => editor.chain().focus().toggleBulletList().run(), '• List', editor.isActive('bulletList'))}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), '1. List', editor.isActive('orderedList'))}
      <span style={{width:'1px',background:'#E5E7EB',margin:'0 4px'}}/>
      {btn(() => editor.chain().focus().toggleBlockquote().run(), 'Quote', editor.isActive('blockquote'))}
      {btn(() => editor.chain().focus().setHorizontalRule().run(), '— Rule', false)}
      <span style={{width:'1px',background:'#E5E7EB',margin:'0 4px'}}/>
      {btn(() => editor.chain().focus().undo().run(), '↩ Undo', false)}
      {btn(() => editor.chain().focus().redo().run(), '↪ Redo', false)}
    </div>
  );
};

export default function BlogEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div style={{border:'1.5px solid #E5E7EB',borderRadius:'8px',overflow:'hidden',minHeight:'300px'}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} style={{padding:'1rem',minHeight:'280px',fontSize:'0.95rem',lineHeight:1.75}} />
    </div>
  );
}