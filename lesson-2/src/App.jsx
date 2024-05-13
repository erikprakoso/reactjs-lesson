import "./App.css";
import { js_beautify } from "js-beautify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

const script = `async findArticles(ctx) {
  try {
      ctx.status = 200;
      ctx.body = {
          data: {
              attributes: entries,
              error: {}
          }
      };
  } catch (error) {
      ctx.status = 500;
      ctx.body = {
          data: {},
          error: {
              status: 500,
              name: "Internal Server Error",
              message: error.message,
              details: error
          }
      };
  }
},`;

// Options for js-beautify
const options = {
  indent_size: 2,
  space_in_empty_paren: true,
  brace_style: "collapse",
  wrap_line_length: 50,
  break_chained_methods: true,
  indent_scripts: "keep",
  max_preserve_newlines: 2,
  unescape_strings: true,
  jslint_happy: true,
  end_with_newline: true,
  wrap_attributes: "auto",
  indent_inner_html: true,
  comma_first: false,
  e4x: true,
  indent_char: " ",
  indent_level: 0,
  preserve_newlines: true,
  space_before_conditional: true,
  wrap_attributes_indent_size: 4,
  extra_liners: [
    "html",
    "head",
    "body",
    "/html",
    "/head",
    "/body",
    "script",
    "style",
  ],
};

function App() {
  // Initialize copiedStates array to track copy status of each code block
  const [copiedStates, setCopiedStates] = useState([]);

  // Function to handle copying and update copiedStates
  const handleCopy = () => {
    const newCopiedStates = [...copiedStates];
    newCopiedStates.push(true); // Menambahkan true ke akhir array
    setCopiedStates(newCopiedStates);
    setTimeout(() => {
      newCopiedStates.pop(); // Menghapus elemen terakhir dari array
      setCopiedStates(newCopiedStates);
    }, 1500);
  };

  return (
    <>
      <div className="w-full">
        <div
          className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 rounded-lg leading-normal overflow-hidden"
        >
          <div className="relative">
            <div className="absolute right-4 top-4 z-10">
              <CopyToClipboard text={script} onCopy={() => handleCopy()}>
                <button
                  className={`px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                    copiedStates[0] ? "font-bold" : ""
                  }`}
                >
                  {copiedStates[0] ? "Copied!" : <FaCopy />}
                </button>
              </CopyToClipboard>
            </div>
            <div
              className="w-full p-4 rounded-lg"
              style={{ backgroundColor: "rgb(40, 42, 54)" }}
            >
              <div className="top mb-2 flex">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="mt-4 flex">
                <SyntaxHighlighter
                  language="javascript"
                  style={dracula}
                  showLineNumbers
                >
                  {js_beautify(script, options)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
