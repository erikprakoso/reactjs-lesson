const Message = ({ text, type, image }) => {
  return (
    <div
      className={`bg-gray-200 p-2 my-2 rounded-md ${
        type === "sent" ? "text-right" : "text-left"
      }`}
    >
      {text && <p className="text-gray-800">{text}</p>}
      {image && (
        <img
          src={image}
          alt="User upload"
          className="max-w-xs mt-2 rounded-md"
        />
      )}
    </div>
  );
};

export default Message;
