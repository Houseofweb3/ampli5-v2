"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { toast } from "react-hot-toast";
import { uploadBlogImage } from "@/src/services/blogImageUpload";

const MAX_INLINE_IMAGE_BYTES = 8 * 1024 * 1024;

export interface BlogRichEditorProps {
  value: string;
  // eslint-disable-next-line no-unused-vars -- callback contract
  onChange: (html: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function BlogRichEditor({
  value,
  onChange,
  disabled,
  placeholder = "Write the article body…",
}: BlogRichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const insertImageFromFile = useCallback(
    async (ed: Editor, file: File) => {
      if (disabled) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please choose an image file.");
        return;
      }
      if (file.size > MAX_INLINE_IMAGE_BYTES) {
        toast.error("Image must be 8MB or smaller.");
        return;
      }

      setUploadingImage(true);
      try {
        const { url } = await uploadBlogImage(file);
        ed.chain().focus().setImage({ src: url, alt: "" }).run();
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Image upload failed.";
        toast.error(msg);
      } finally {
        setUploadingImage(false);
      }
    },
    [disabled]
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      TiptapImage.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4 border border-gray-100",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "<p></p>",
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "prose-manage min-h-[220px] px-3 py-2 focus:outline-none text-gray-800 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || disabled) return;
    const el = editor.view.dom as HTMLElement;

    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file" && item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) void insertImageFromFile(editor, file);
          return;
        }
      }
    };

    const onDrop = (e: DragEvent) => {
      const files = e.dataTransfer?.files;
      if (!files?.length) return;
      const file = Array.from(files).find((f) => f.type.startsWith("image/"));
      if (!file) return;
      e.preventDefault();
      void insertImageFromFile(editor, file);
    };

    el.addEventListener("paste", onPaste);
    el.addEventListener("drop", onDrop);
    return () => {
      el.removeEventListener("paste", onPaste);
      el.removeEventListener("drop", onDrop);
    };
  }, [editor, disabled, insertImageFromFile]);

  useEffect(() => {
    if (!editor || disabled === undefined) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  const triggerImagePicker = () => {
    if (disabled || uploadingImage) return;
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file && editor) void insertImageFromFile(editor, file);
  };

  if (!editor) {
    return (
      <div className="min-h-[220px] rounded-lg border border-gray-200 bg-gray-50 animate-pulse" />
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onChange={onFileInputChange}
      />
      <div className="flex flex-wrap gap-1 border-b border-gray-100 bg-gray-50 px-2 py-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
          disabled={!!disabled}
        />
        <span className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="H2"
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="H3"
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="List"
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="1."
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Quote"
          disabled={!!disabled}
        />
        <span className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden />
        <ToolbarButton
          onClick={() => {
            const prev = editor.getAttributes("link").href;
            const url = window.prompt("Link URL", prev || "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
          label="Link"
          disabled={!!disabled}
        />
        <ToolbarButton
          onClick={triggerImagePicker}
          active={editor.isActive("image")}
          label={uploadingImage ? "…" : "Image"}
          disabled={!!disabled || uploadingImage}
        />
      </div>
      <EditorContent editor={editor} />
      <p className="text-xs text-gray-500 px-3 py-2 border-t border-gray-100 bg-gray-50">
        Images upload via <code className="text-[11px]">…/web/blog-images/upload</code>. Paste, drop,
        or use Image.
      </p>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  label,
  disabled,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 text-xs font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? "bg-primary text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
