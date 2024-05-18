import { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaUpload } from "react-icons/fa";

const ChatForm = ({ loading, handleImageSubmit }) => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    if (selectedFile) {
      handleImageSubmit(selectedFile, text);
      setText("");
    }
  };

  return (
    <form className="mt-4 flex items-center border border-gray-300 rounded-md">
      <label htmlFor="fileInput" className="cursor-pointer p-2">
        <FaUpload className="text-gray-500" />
      </label>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow py-2 px-4 focus:outline-none focus:border-blue-400"
        disabled={loading}
      />
      <button
        type="submit"
        onClick={handleButtonClick}
        className="p-2"
        disabled={loading}
      >
        <FaPaperPlane className="text-blue-500" />
      </button>
    </form>
  );
};

ChatForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleImageSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
