import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messageListRef = useRef(null);

  const handleSubmit = async (input) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      const newReceivedMessage = { text, type: "received" };
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (image) => {
    console.log("Image submitted:", image);
    if (!image || !image.type.startsWith("image/")) {
      console.error("Not a valid image file.");
      return;
    }

    setLoading(true);

    try {
      const imgDataInBase64 = await convertImageToBase64(image);
      await handleSubmit([
        "What's in this photo?",
        { inlineData: { data: imgDataInBase64, mimeType: "image/jpeg" } },
      ]);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) =>
          reject("Error converting image to base64:", error);
        reader.readAsDataURL(file);
      } catch (error) {
        reject("Error converting image to base64:", error);
      }
    });
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
          <ChatForm loading={loading} handleImageSubmit={handleImageSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;
