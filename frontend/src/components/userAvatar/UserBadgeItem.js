import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ u, handleFunction, admin ,user}) => {
  return (
    <Badge  // selected user in the groups ko show karane ke liye with better ui  used this(used in the GroupChatModal)
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="subtle"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {u.name}
      { (admin._id === u._id)  && <span> (Admin)</span>}
      { (user._id === u._id ) && <span> (You)</span> }
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
