import { ViewIcon, EditIcon } from "@chakra-ui/icons";
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
  IconButton,
  Text,
  Image,
  Input,
  Box,
  Spinner,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useState ,useEffect} from "react";
import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls modal visibility
  const toast = useToast();
  const [uploading, setUploading] = useState(false);


  const {user,setUser} = ChatState() ;  //since, App.js me App component is wrapped around ChatProvider ,so ,any change /updation in the states exported from chatProvider(context api) will re-render the component in which they are called/imported . 
  //so,if for example here i called the user and setUser part from the context api and when user successfull updates the image,then ,i update the user ,so all the components (which imported the user state from the context api will re-render ,obviously the one which are currently active will re-render )
  //why i want to acheive ? after doing this ,whenever the person updates the image ,then all the components which are active and had imported the user state from context api will  re-render . and hence, updated picture mujhe dikhega in the profile modal at the same time when person updates
  //but, note -> those components wont be re-rendred where "user" state is just imported from context api but never used .
  //also , parent component of the components (which are getting re-render) will also re-render even they did not import the "user" state from the context api,but,since the child is getting re-rendered ,the parent will also re-render
  
  // Handler for file input change
  const handleFileChange = async (e) => {
    const pic = e.target.files[0];
    if (!pic) return;

    setUploading(true);

    // Prepare form data for uploading (example using Cloudinary)
    const formData = new FormData();
    formData.append("file", pic);
    formData.append("upload_preset", "login-signup-cloudinary"); // Your preset name
    formData.append("cloud_name", "dkyhpc8fx"); // Your cloud name

    try {
      // Upload image to Cloudinary
      const res = await fetch("https://api.cloudinary.com/v1_1/dkyhpc8fx/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {  //if data contains the url 
        // Now update the user's picture in your backend
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));  //becoz, localStorage.getItem returns a string , and now ,i need obj so that next line me dot operator can be used
        const token = userInfo?.token;
        const updateRes = await fetch("https://convohub-l7f3.onrender.com/api/user/update-pic", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pic: data.secure_url }),
        });
        if (updateRes.ok) {
          let updatedUserInfo = { ...userInfo, pic: data.secure_url };
          localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
          setUser(updatedUserInfo); // Update the  state called from context api 
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been successfully updated.",
            status: "success",
            duration: 5000,
            isClosable: true, 
          });
        } else {
          toast({
            title: "Update Failed",
            description: "Unable to update your profile picture.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Upload Failed",
          description: "Image upload failed. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Upload error: ", error);
      toast({
        title: "Upload Error",
        description: "An error occurred while uploading the image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

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
            {user.name}
          </ModalHeader>

          <ModalCloseButton color="purple.600" />

          <ModalBody textAlign="center" fontSize={["sm", "md", "lg"]} fontWeight="medium">
            <Box position="relative" display="inline-block">
              <Image
                borderRadius="full"
                boxSize={["70px", "90px", "110px"]}
                src={user.pic}
                alt={user.name}
                mb={4}
                mx="auto"
                border="2px solid"
                borderColor="purple.600"
                boxShadow="md"
              />
              {/* Overlay edit icon */}
              <IconButton
                icon={uploading ? <Spinner size="xs" /> : <EditIcon />}
                size="sm"
                colorScheme="purple"
                position="absolute"
                bottom={0}
                right={0}
                onClick={() => document.getElementById("profilePicInput").click()}
                aria-label="Change Profile Picture"
              />
            </Box>
            {/* Hidden file input */}
            <Input
              id="profilePicInput"
              type="file"
              display="none"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Text
              fontFamily="Work Sans"
              fontSize={["sm", "md", "3xl"]}
              fontWeight="medium"
              mt={2}
            >
              Email: {user.email}
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

export default ProfileModal;
