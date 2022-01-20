import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./AuthContext";
import { ReactNode } from "react";
import { theme } from "../styles/theme";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <AuthProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </AuthProvider>
);
