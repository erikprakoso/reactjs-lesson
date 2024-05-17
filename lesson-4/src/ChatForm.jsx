import PropTypes from "prop-types";

const ChatForm = ({ loading, handleImageSubmit }) => {
  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
      handleImageSubmit(fileInput.files[0]);
    }
  };

  return (
    <form className="mt-4">
      {/* Include input for file selection */}
      <input
        id="fileInput"
        type="file"
        className="mt-2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        disabled={loading}
      />
      {/* Change button type to submit */}
      <button
        type="submit"
        onClick={handleButtonClick}
        className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Image"}
      </button>
    </form>
  );
};

ChatForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleImageSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
