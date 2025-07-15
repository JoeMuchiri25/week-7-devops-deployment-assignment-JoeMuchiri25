const TypingIndicator = ({ name }) => {
  return (
    <div className="text-xs text-gray-500 italic px-2">
      {name} is typing...
    </div>
  );
};

export default TypingIndicator;
