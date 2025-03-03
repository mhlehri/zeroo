"use client";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading,
  Highlighter,
  Italic,
  Strikethrough,
  TypeOutline,
} from "lucide-react";
import { Button } from "./ui/button";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="roundeddd-t-lg bg-gray-100 p-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="light"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <Heading size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${
            editor.isActive("paragraph")
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <TypeOutline size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold")
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <Bold size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic")
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <Italic size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("strike")
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <Strikethrough size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${
            editor.isActive("highlight")
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <Highlighter size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <AlignLeft size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <AlignCenter size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${
            editor.isActive({ textAlign: "right" })
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <AlignRight size={12} />
        </Button>
        <Button
          type="button"
          variant="light"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`${
            editor.isActive({ textAlign: "justify" })
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          } size-6`}
        >
          <AlignJustify size={12} />
        </Button>
      </div>
    </div>
  );
};

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: `
      <h3 class="text-center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p class="text-center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p class="text-center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p class="text-center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  return (
    <div className="roundeddd-lg mx-auto max-w-3xl bg-white p-4 shadow-lg">
      <MenuBar editor={editor} />
      <EditorContent
        className="prose prose-sm sm:prose lg:prose-md focus:ring-none roundeddd-lg mx-auto border border-gray-200 bg-gray-50 focus:border-none focus:outline-none"
        editor={editor}
      />
    </div>
  );
}
