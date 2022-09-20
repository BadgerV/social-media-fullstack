import "./closeFriend.css";

const CloseFriend = ({ user }) => {
  return (
    <li className="sidebarFriendListItem">
      <img src={user.profilePicture} alt="" className="sidebarFriendimg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
