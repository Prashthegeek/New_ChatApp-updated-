import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Image,
    Box,
  } from "@chakra-ui/react";
  
  const SenderProfileModal = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const defaultPic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  
    return (
      <>
        {/* Button to open the profile modal */}
        <Button variant="outline" onClick={onOpen}>
          View Profile
        </Button>
  
        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
          <ModalContent
            maxW={["80%", "75%", "70%", "40%"]}
            p={[3, 4, 6]}
            m={0}
            borderRadius="xl"
            boxShadow="xl"
            mx="auto"
          >
            <ModalHeader
              fontSize={["lg", "xl", "2xl"]}
              fontWeight="bold"
              color="purple.600"
              textAlign="center"
            >
              {user.name || "Unknown User"}
            </ModalHeader>
            <ModalCloseButton color="purple.600" />
            <ModalBody
              textAlign="center"
              fontSize={["sm", "md", "lg"]}
              fontWeight="medium"
            >
              <Box position="relative" display="inline-block">
                <Image
                  borderRadius="full"
                  boxSize={["70px", "90px", "110px"]}
                  src={user.pic || defaultPic}
                  alt={user.name || "Profile"}
                  mb={4}
                  mx="auto"
                  border="2px solid"
                  borderColor="purple.600"
                  boxShadow="md"
                />
                
  
              </Box>
              <Text
                fontFamily="Work Sans"
                fontSize={["sm", "md", "3xl"]}
                fontWeight="medium"
                mt={2}
              >
                Email: {user.email || "No email provided"}
              </Text>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                variant="ghost"
                colorScheme="purple"
                _hover={{ bg: "gray.200" }}
                size={["sm", "md", "lg"]}
                onClick={onClose}
                px={6}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SenderProfileModal;
  