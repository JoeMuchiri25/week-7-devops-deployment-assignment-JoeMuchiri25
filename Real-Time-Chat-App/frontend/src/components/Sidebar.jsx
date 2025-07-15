// /client/src/components/Sidebar.jsx
import UserStatus from './UserStatus';

const Sidebar = ({ users, onSelect, currentUserId }) => {
  return (
    <div className="w-64 border-r h-full bg-white overflow-y-auto">
      <h2 className="text-lg font-bold p-4 border-b">Contacts</h2>
      {users.map((u) => (
        <UserStatus
          key={u._id}
          user={u}
          isOnline={u.isOnline}
          onClick={() => onSelect(u)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
