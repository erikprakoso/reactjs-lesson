const ChatForm = ({ inputText, loading, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        disabled={loading}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatForm;
