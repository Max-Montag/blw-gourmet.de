import React from "react";
import Image from "next/image";
import { Descendant, Element as SlateElement, Text as SlateText } from "slate";
import { lato } from "@/styles/fonts";
import { ArticleData } from "@/types/articleTypes";

interface ArticleDisplayProps {
  article: ArticleData;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ article }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const renderSlateContent = (content: Descendant[]) => {
    return content.map((node: Descendant, index: number) => {
      if (SlateElement.isElement(node)) {
        switch (node.type) {
          case "paragraph":
            return (
              <p key={"p_" + index} className="text-gray-700 text-lg mb-4">
                {node.children.map((child, idx) =>
                  renderText(child, index, idx)
                )}
              </p>
            );
          case "heading-one":
            return (
              <h2 key={"h1_" + index} className="text-2xl font-semibold mb-4">
                {node.children.map((child, idx) =>
                  renderText(child, index, idx)
                )}
              </h2>
            );
          case "heading-two":
            return (
              <h3 key={"h2_" + index} className="text-xl font-semibold mb-4">
                {node.children.map((child, idx) =>
                  renderText(child, index, idx)
                )}
              </h3>
            );
          default:
            return null;
        }
      } else {
        return <span key={index}>{node.text}</span>;
      }
    });
  };

  const renderText = (node: Descendant, parentIndex: number, index: number) => {
    if (!SlateText.isText(node)) {
      return null;
    }

    let text = <>{node.text}</>;

    if (node.bold) {
      text = <strong key={parentIndex + "_bold_" + index}>{text}</strong>;
    }

    if (node.italic) {
      text = <em key={parentIndex + "_italic_" + index}>{text}</em>;
    }

    if (node.underline) {
      text = <u key={parentIndex + "_underline_" + index}>{text}</u>;
    }

    return <span key={parentIndex + "_text_" + index}>{text}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <div className="relative h-56 lg:h-72">
        {article.optimized_image ? (
          <Image
            src={`${apiUrl}${article.optimized_image}`}
            alt={article.title}
            fill
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-56 lg:h-72 bg-zinc-300">
            <span className="text-xs text-zinc-600">Bild nicht gefunden</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h1
          className={`text-2xl lg:text-4xl font-bold mb-4 text-center text-cyan-900 ${lato.className}`}
        >
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
