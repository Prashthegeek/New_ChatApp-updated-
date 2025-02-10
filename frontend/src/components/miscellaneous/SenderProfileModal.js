import React from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const SenderProfile = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 'user' is an object containing the sender's information (e.g., name, email, pic)
  return (
    <>
      {/* Button to open the profile modal */}
      <Button variant="outline" onClick={onOpen}>
        View Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <Avatar
                size="2xl"
                name={user.name}
                src={user.pic}  // If user.pic is undefined, Chakra UI Avatar will fallback to initials
                mb={4}
              />
              <Text fontSize="lg" fontWeight="semibold">
                {user.name}
              </Text>
              <Text fontSize="md" color="gray.600">
                {user.email}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SenderProfile;
