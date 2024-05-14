import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const messageListRef = useRef(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newMessage = { text: inputText, type: "sent" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: inputText,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      if (data.candidates?.length > 0) {
        const generatedText = data.candidates[0]?.content?.parts[0]?.text;
        if (generatedText) {
          const newReceivedMessage = { text: generatedText, type: "received" };
          setMessages([...newMessages, newReceivedMessage]);
          setInputText("");
        } else {
          console.error("Invalid response format: Missing generated text");
        }
      } else {
        console.error("Invalid response format: Missing candidates array");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of message list when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-end bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Chat with Gemini</h1>
          <div
            ref={messageListRef}
            className="flex-1 overflow-y-auto mb-4 max-h-100"
          >
            {messages.map((message, index) => (
              <Message key={index} text={message.text} type={message.type} />
            ))}
          </div>
          <ChatForm
            inputText={inputText}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
