"use client";

import React, { useCallback, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  BaseEditor,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";
import { ArticleData } from "@/types/articleTypes";

type CustomEditor = BaseEditor & ReactEditor;

type ParagraphElement = {
  type: "paragraph";
  children: Descendant[];
};

type HeadingOneElement = {
  type: "heading-one";
  children: Descendant[];
};

type HeadingTwoElement = {
  type: "heading-two";
  children: Descendant[];
};

type CustomElement = ParagraphElement | HeadingOneElement | HeadingTwoElement;

type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  [key: string]: boolean | string | undefined;
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: FormattedText;
  }
}

interface EditArticleDisplayProps {
  articleData: ArticleData;
  onArticleChange: (article: ArticleData) => void;
}

const EditArticleDisplay: React.FC<EditArticleDisplayProps> = ({
  articleData,
  onArticleChange,
}) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>(
    articleData.content && articleData.content.length > 0
      ? articleData.content
      : [{ type: "paragraph", children: [{ text: "" }] }]
  );
  const [title, setTitle] = useState<string>(articleData.title);

  const onValueChange = (newValue: Descendant[]) => {
    setValue(newValue);
    onArticleChange({ ...articleData, content: newValue });
  };

  const onTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onArticleChange({ ...articleData, title: newTitle });
  };

  const isMarkActive = (editor: Editor, format: string): boolean => {
    const marks = Editor.marks(editor) as Record<
      string,
      boolean | undefined
    > | null;
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n) => SlateElement.isElement(n) && n.type === format,
      })
    );
    return !!match;
  };

  const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(editor, format);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : format },
      {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const { element, attributes, children } = props;
    switch (element.type) {
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    const attributes = props.attributes;
    const leaf = props.leaf;
    let children = props.children;

    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full border p-2 mb-4"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Titel des Artikels"
      />
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => onValueChange(newValue)}
      >
        <div className="toolbar mb-2 flex space-x-2">
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "bold");
            }}
            className={`p-1 border rounded-xl border-zinc-800 cursor-pointer${
              isMarkActive(editor, "bold") ? "active" : ""
            }`}
          >
            <MdFormatBold size={24} />
          </button>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "italic");
            }}
            className={`p-1 border rounded-xl border-zinc-800 cursor-pointer${
              isMarkActive(editor, "italic") ? "active" : ""
            }`}
          >
            <MdFormatItalic size={24} />
          </button>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "underline");
            }}
            className={`p-1 border rounded-xl border-zinc-800 cursor-pointer${
              isMarkActive(editor, "underline") ? "active" : ""
            }`}
          >
            <MdFormatUnderlined size={24} />
          </button>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              toggleBlock(editor, "heading-one");
            }}
            className={`p-1 border rounded-xl border-zinc-800 cursor-pointer${
              isBlockActive(editor, "heading-one") ? "active" : ""
            }`}
          >
            <LuHeading1 size={24} />
          </button>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              toggleBlock(editor, "heading-two");
            }}
            className={`p-1 border rounded-xl border-zinc-800 cursor-pointer${
              isBlockActive(editor, "heading-two") ? "active" : ""
            }`}
          >
            <LuHeading2 size={24} />
          </button>
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Artikelinhalt eingeben..."
          className="w-full border p-4 min-h-screen"
        />
      </Slate>
    </div>
  );
};

export default EditArticleDisplay;
