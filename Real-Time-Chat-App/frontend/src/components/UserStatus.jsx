// /client/src/components/UserStatus.jsx
const UserStatus = ({ user, isOnline, onClick }) => (
  <div
    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
    onClick={onClick}
  >
    <img
      src="/default-avatar.png"
      alt="avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <span className="font-medium">{user.username}</span>
      <span
        className={`text-sm ${
          isOnline ? 'text-green-500' : 'text-gray-400'
        }`}
      >
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  </div>
);

export default UserStatus;
