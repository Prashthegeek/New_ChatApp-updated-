import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { Image, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import googleIcon from "../assets/google-icon.png"; //image of Google iconis  is in  the  assets folder 


const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState(""); // Initialize email and password as empty strings to ensure the input fields are controlled from the start.// React issues a warning if an input field switches between uncontrolled (initially undefined) and controlled (when a value is assigned). 
  const [password, setPassword] = useState("");  //react wants a component to be either in the controlled or uncontrolled state throughout it's lifetime, initially if we declare the states as () with no input inside(even the empty string), then it becomes undefined and it is uncontrolled input, later on  ,if we use these states to assign some values,then react throws error (warning)
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { User, setUser } = ChatState();


  //for signup with google(oAuth)
  const handleGoogleSignIn = () => {
    // Redirect to the backend's Google OAuth endpoint
    window.location.href = "https://convohub-l7f3.onrender.com/api/user/google";
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setUser(data);

      localStorage.setItem("userInfo", JSON.stringify(data));   //data stored only after login , not even after signup ,after signup ,person comes to login ,and then information is stored in the storage.
   
      history.push("/chats");  //url changes and page reloads
    } catch (error) {
      console.log("Error Response:", error.response);
      console.log("Error Details:", error);

      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      
      {/*Google auth */}
      <Button
        onClick={handleGoogleSignIn}
        bg="white"
        color="gray.700"
        border="1px solid #ddd"
        boxShadow="md"
        borderRadius="full"
        py={3}
        px={5}
        fontSize="lg"
        fontWeight="medium"
        transition="all 0.3s"
        _hover={{
          bg: "gray.100",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        _active={{
          bg: "gray.200",
          transform: "scale(0.98)",
          boxShadow: "sm",
        }}
        leftIcon={<Image src={googleIcon} boxSize="24px" />}
      >
        <Flex align="center">
          <Text ml={2}>Sign in with Google</Text>
        </Flex>
      </Button>
    </VStack>
  );
};

export default Login;
