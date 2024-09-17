import React from "react";
import { ArticleData, SlateNode, SlateTextNode } from "@/types/articleTypes";
import Image from "next/image";

interface ArticleDisplayProps {
  article: ArticleData;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ article }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const renderSlateContent = (content: SlateNode[]) => {
    return content.map((node: SlateNode, index: number) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p key={index} className="text-gray-700 text-lg mb-4">
              {node.children.map((child: SlateTextNode, idx: number) =>
                renderText(child, idx),
              )}
            </p>
          );
        case "heading-one":
          return (
            <h2 key={index} className="text-2xl font-semibold mb-4">
              {node.children.map((child: SlateTextNode, idx: number) =>
                renderText(child, idx),
              )}
            </h2>
          );
        case "heading-two":
          return (
            <h3 key={index} className="text-xl font-semibold mb-4">
              {node.children.map((child: SlateTextNode, idx: number) =>
                renderText(child, idx),
              )}
            </h3>
          );
        case "image":
          return (
            <div key={index} className="my-4">
              <Image
                src={`${apiUrl}${node.url}`}
                alt={node.alt || ""}
                className="w-full h-auto"
              />
            </div>
          );
        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-cyan-700 pl-4 italic text-gray-600 mb-4"
            >
              {node.children.map((child: SlateTextNode, idx: number) =>
                renderText(child, idx),
              )}
            </blockquote>
          );
        default:
          return null;
      }
    });
  };

  const renderText = (node: SlateTextNode, index: number) => {
    let text = <>{node.text}</>;

    if (node.bold) {
      text = <strong key={index}>{text}</strong>;
    }

    if (node.italic) {
      text = <em key={index}>{text}</em>;
    }

    if (node.underline) {
      text = <u key={index}>{text}</u>;
    }

    if (node.code) {
      text = (
        <code key={index} className="bg-gray-100 p-1 rounded">
          {text}
        </code>
      );
    }

    return text;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md scroll-smooth teachers-regular">
      <div className="relative">
        {article.optimized_image ? (
          <Image
            src={`${apiUrl}${article.optimized_image}`}
            alt={article.title}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200">
            <span className="text-xs text-gray-600">Bild nicht gefunden</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center text-gray-800 marcellus-semibold">
          {article.title}
        </h1>
        {article.content && article.content.length > 0 && (
          <div className="mt-6 space-y-6 text-lg text-gray-800">
            {renderSlateContent(article.content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDisplay;
