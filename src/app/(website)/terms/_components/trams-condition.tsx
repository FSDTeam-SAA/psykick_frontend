"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const TermsConditions = () => {
  // const token = localStorage.getItem('token');
  const [content, setContent] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  // Load token on client side only
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Ensure localStorage is accessed only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // Fetch data from the backend for the Terms and Conditions
  const { data, error, isLoading } = useQuery({
    queryKey: ["getTermsAndCondition", token],
    queryFn: async () => {
      if (!token) return null; // Avoid fetching if token is not available

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/terms-and-condition/get-terms-and-condition`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Terms & Conditions");
        }

        return response.json(); // Assuming the response is JSON and contains 'content'
      } catch (error) {
        console.log("Error fetching terms and conditions:", error);
      }
    },
    enabled: !!token, // Only run the query if the token is available
  });

  // Update the content state with fetched data when available
  useEffect(() => {
    if (data) {
      setContent(data?.data[0]?.content || ""); // Assuming 'content' is the field in the response
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading Terms & Conditions...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" w-full container  ">
    <div className="pt-32 pb-20">
    <div className="bg-[#FFFFFF1A]  p-4 rounded-lg  pb-10 ">
        <div className="flex   justify-between items-center mb-6 bg-gradient-to-r from-[#8F37FF] to-[#2D17FF] py-5 px-4 rounded-lg">
          <h1 className="text-2xl font-bold p-5 text-white">
            Terms & Conditions
          </h1>
        </div>

        {/* Content Area */}
        <div className="bg-purple-800 bg-opacity-50 rounded-lg p-6">
          <div className="space-y-4 h-[800px] overflow-y-auto scroll-smooth">
            {/* Render content as HTML */}
            <div
              className="prose prose-invert text-white"
              dangerouslySetInnerHTML={{ __html: content }} // Render HTML content
            />
          </div>
        </div>
      </div>
    </div>

      {/* Extra styles for quill dark mode */}
      <style jsx global>{`
        /* General Styling for Quill Editor */
        .custom-quill .ql-toolbar {
          background: #6b21a8; /* Purple background for the toolbar */
          border: none;
          color: white;
        }

        .custom-quill .ql-toolbar .ql-picker,
        .custom-quill .ql-toolbar .ql-stroke {
          color: black;
          stroke: white;
        }

        .custom-quill .ql-toolbar .ql-fill {
          fill: white;
        }

        .custom-quill .ql-container {
          background: #581c87; /* Dark purple background for the editor */
          border: none;
        }

        .custom-quill .ql-editor {
          color: white; /* White text for editor */
        }
        .custom-quill .ql-editor a {
          color: #4dabf7 !important; /* Add !important to enforce the color */
          text-decoration: underline;
        }
        /* Styling for Heading tags */
        .custom-quill .ql-editor h1,
        .custom-quill .ql-editor h2,
        .custom-quill .ql-editor h3 {
          color: white; /* Ensure header text is visible with white color */
        }

        /* Styling for links */
        .custom-quill .ql-editor a {
          color: #4dabf7; /* Adjust link color to blue */
          text-decoration: underline;
        }

        /* Styling for Lists */
        .custom-quill .ql-editor ul {
          list-style-type: disc; /* Disc (bullet) style for unordered lists */
          padding-left: 20px; /* Indentation for list items */
        }

        .custom-quill .ql-editor ol {
          list-style-type: decimal; /* Numbered list style */
          padding-left: 20px; /* Indentation for ordered lists */
        }

        .custom-quill .ql-editor li {
          font-weight: normal; /* Normal weight for list items */
        }

        /* Styling for Blockquotes */
        .custom-quill .ql-editor blockquote {
          background: #2c2c2c; /* Dark background for blockquotes */
          border-left: 4px solid #4dabf7; /* Blue border on the left */
          padding: 10px 15px;
          margin: 10px 0;
          font-style: italic; /* Italicized text for blockquotes */
        }

        /* Custom Styling for Prose (view mode content after saving) */
        .prose {
          max-width: 100%; /* Ensure prose does not exceed its container */
          line-height: 1.6;
          color: white; /* Text color for saved content */
        }

        .prose h1 {
          font-size: 40px;
        }
        .prose a {
          color: #4dabf7 !important;
          text-decoration: underline;
        }
        .prose h2 {
          font-size: 30px;
        }

        .prose h3 {
          color: white; /* Ensure headings in prose are white */
          font-size: 14px;
        }
        /* Custom Styling for Prose (view mode content after saving) */
        .prose {
          max-width: 100%; /* Ensure prose does not exceed its container */
          line-height: 1.6; /* Default line-height for readability */
          color: white; /* Text color for saved content */
          font-family: "Arial", sans-serif; /* Font for content */
        }

        .prose h1 {
          font-size: 2.25rem; /* 36px */
          line-height: 1.2; /* Tight line height for headers */
          margin-bottom: 1rem; /* Spacing below heading */
        }

        .prose h2 {
          font-size: 1.875rem; /* 30px */
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }

        .prose h3 {
          font-size: 1.5rem; /* 24px */
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .prose h4 {
          font-size: 1.25rem; /* 20px */
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }

        .prose h5 {
          font-size: 1.125rem; /* 18px */
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .prose h6 {
          font-size: 1rem; /* 16px */
          line-height: 1.7;
          margin-bottom: 0.5rem;
        }

        /* Paragraph Styling */
        .prose p {
          margin-bottom: 1rem; /* Add spacing between paragraphs */
        }

        /* List Styling */
        .prose ul {
          list-style-type: disc; /* Bullet points for unordered lists */
          padding-left: 20px; /* Indentation for lists */
        }

        .prose ol {
          list-style-type: decimal; /* Numbered lists */
          padding-left: 20px;
        }

        .prose li {
          margin-bottom: 0.5rem; /* Space between list items */
        }

        /* Link Styling */
        .prose a {
          color: #4dabf7; /* Blue color for links */
          text-decoration: underline;
        }

        /* Blockquote Styling */
        .prose blockquote {
          background: #2c2c2c; /* Dark background for blockquotes */
          border-left: 4px solid #4dabf7; /* Blue left border */
          padding: 10px 15px;
          margin: 10px 0;
          font-style: italic;
        }

        /* List Styling for Prose content */
        .prose ul {
          list-style-type: disc;
          padding-left: 20px;
        }

        .prose ol {
          list-style-type: decimal;
          padding-left: 20px;
        }

        .prose li {
          font-weight: normal; /* Ensure no bold font in list items */
        }

        /* General Page Styling */
        .bg-purple-800 {
          background-color: #581c87; /* Dark purple background */
        }

        .bg-purple-700 {
          background-color: #6b21a8; /* Medium purple background */
        }

        .bg-purple-600 {
          background-color: #7e3af2; /* Lighter purple background */
        }

        .text-white {
          color: white; /* White text color */
        }

        /* Buttons */
        .bg-blue-600 {
          background-color: #2563eb; /* Blue button color */
        }

        .hover\:bg-blue-700:hover {
          background-color: #1e40af; /* Darker blue on hover */
        }

        .bg-red-600 {
          background-color: #dc2626; /* Red button color */
        }

        .hover\:bg-red-700:hover {
          background-color: #b91c1c; /* Darker red on hover */
        }

        .bg-purple-600 {
          background-color: #7e3af2; /* Purple button color */
        }

        .hover\:bg-purple-500:hover {
          background-color: #9b4de7; /* Lighter purple on hover */
        }

        .px-4,
        .py-1,
        .px-6,
        .py-2 {
          padding: 0.5rem 1rem; /* Horizontal and vertical padding for buttons */
        }

        .rounded-md {
          border-radius: 0.375rem; /* Rounded corners for buttons */
        }

        .mt-6 {
          margin-top: 1.5rem; /* Top margin for spacing */
        }

        .space-y-4 {
          margin-bottom: 1rem; /* Bottom spacing between elements */
        }

        /* Fix for editor text and button contrast */
        .ql-editor,
        .prose {
          font-family:
            "Arial", sans-serif; /* Ensure readable font for content */
        }
      `}</style>
    </div>
  );
};

export default TermsConditions;
