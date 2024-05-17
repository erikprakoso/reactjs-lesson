const Message = ({ text, type }) => {
  return (
    <div className={`bg-gray-200 p-2 my-2 rounded-md ${type === "sent" ? "text-right" : "text-left"}`}>
      <p className="text-gray-800">{text}</p>
    </div>
  );
};

export default Message;