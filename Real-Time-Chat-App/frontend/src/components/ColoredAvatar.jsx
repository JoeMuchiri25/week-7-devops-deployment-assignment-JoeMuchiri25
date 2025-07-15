const ColoredAvatar = ({ name }) => {
  const getInitials = (str) =>
    str
      .split(' ')
      .map((s) => s[0])
      .join('')
      .toUpperCase();

  const getColor = (str) => {
    const hash = Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: getColor(name) }}
    >
      {getInitials(name)}
    </div>
  );
};

export default ColoredAvatar;
