import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  VStack,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const history = useHistory(); // Using useHistory instead of useNavigate
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    toast({
      title: 'Error',
      description: 'Email is missing. Please sign up again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const handleResend = async () => {
    try {
      setIsLoading(true);
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('/api/user/resend-otp', { email }, config);
      toast({
        title: 'Verification Email Resent',
        description: 'A new verification email has been sent to your inbox.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      toast({
        title: 'Error Resending Email',
        description: error.response?.data?.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/user/verify-otp`, { email, otp });
      toast({
        title: 'Account verified!',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      history.push('/successOtp'); // Redirect using history.push
    } catch (error) {
      toast({
        title: 'OTP Verification failed',
        description: error.response?.data?.message || 'Invalid OTP',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack as="form" spacing={4} onSubmit={handleOtpSubmit}>
        <Heading as="h3" size="lg">Verify Your Account</Heading>
        <FormControl id="otp" isRequired>
          <FormLabel>Enter OTP</FormLabel>
          <Input
            name="otp"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleOtpSubmit}
          isLoading={isLoading}
          loadingText="Verifying"
        >
          Verify OTP
        </Button>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={handleResend}
          isDisabled={isLoading}
        >
          Resend OTP
        </Button>
      </VStack>
    </Box>
  );
};

export default EmailVerification;
