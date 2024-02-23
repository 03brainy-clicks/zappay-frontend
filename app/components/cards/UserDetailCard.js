import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// UserDetailCard component receives a user object and displays user details
const UserDetailCard = ({ user }) => {
  // Destructure properties from the user object
  const { _id, firstName, lastName, username } = user;

  // JSX for the UserDetailCard component
  return (
    <div className="text-white flex gap-4 border-b items-center hover:bg-zap-hoverBlack p-2 border-zap-lightBlack">
      {/* User avatar with the first character of the first name */}
      <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
        <span>{firstName[0]}</span>
      </div>
      {/* User details including full name and username */}
      <div className="mr-auto">
        {firstName} {lastName} <br />
        <span className="text-xs">{username}</span>
      </div>
      {/* Button to navigate to the payment page for the specific user */}
      <Link href={`payment/${_id}`}>
        <button className="ml-auto py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium">
          Pay
        </button>
      </Link>
    </div>
  );
};

// Export the UserDetailCard component
export default UserDetailCard;
