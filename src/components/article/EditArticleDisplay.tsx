"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '../common/loadingAnimation/LoadingAnimation';

interface EditArticleDisplayProps {
  articleUrl: string;
}

const EditArticleDisplay: React.FC<EditArticleDisplayProps> = ({ articleUrl }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>([]);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/articles/article/${articleUrl}/`);
        setTitle(response.data.title);
        setValue(response.data.content && response.data.content.length > 0 ? response.data.content : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]);
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
            'Content-Type': 'application/json',
          },
        }
      );
      router.push('/admin/dashboard/');
    } catch (error) {
      console.error("Fehler beim Speichern des Artikels", error);
      alert("Fehler beim Speichern des Artikels!");
    }
  };

  const renderElement = useCallback((props: any) => {
    return <p {...props.attributes}>{props.children}</p>;
  }, []);

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <input
        type="text"
        className="w-full border p-2 mb-4"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Artikeltitel"
      />
      <Slate editor={editor} initialValue={value} onChange={(newValue: React.SetStateAction<Descendant[]>) => setValue(newValue)}>
        <Editable
          renderElement={renderElement}
          placeholder="Artikelinhalt eingeben..."
          className="border p-4 min-h-screen"
        />
      </Slate>
      <button
        className="bg-cyan-500 text-white px-4 py-2 mt-4"
        onClick={handleSave}
      >
        Artikel speichern
      </button>
    </div>
  );
};

export default EditArticleDisplay;
