"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../common/loadingAnimation/LoadingAnimation";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";

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
  [key: string]: any;
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: FormattedText;
  }
}

interface EditArticleDisplayProps {
  articleUrl: string;
}

const EditArticleDisplay: React.FC<EditArticleDisplayProps> = ({
  articleUrl,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/articles/article/${articleUrl}/`,
        );
        setTitle(response.data.title);
        setValue(
          response.data.content && response.data.content.length > 0
            ? response.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
              ],
        );
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden des Artikels", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [apiUrl, articleUrl]);

  const handleSave = async () => {
    try {
      const data = {
        title: title,
        content: value,
      };
      await axios.put(
        `${apiUrl}/articles/article/update/${articleUrl}/`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      router.push("/admin/dashboard/");
    } catch (error) {
      console.error("Fehler beim Speichern des Artikels", error);
      alert("Fehler beim Speichern des Artikels!");
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as { [key: string]: any } | null;
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
      }),
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
      },
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
    let { attributes, children, leaf } = props;

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

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="w-4-xl max-w-4xl mx-auto py-6">
      <input
        type="text"
        className="w-full border p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Artikeltitel"
      />
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
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
          className="border p-4 min-h-screen"
        />
      </Slate>
      <div className="w-full flex justify-center mt-4">
        <button
          className="bg-cyan-500 text-white rounded-lg px-4 py-2 mt-4"
          onClick={handleSave}
        >
          Artikel speichern
        </button>
      </div>
    </div>
  );
};

export default EditArticleDisplay;
