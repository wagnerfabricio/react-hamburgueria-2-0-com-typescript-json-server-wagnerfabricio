import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./AuthContext";

import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { ProdProvider } from "./ProdContext";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <AuthProvider>
    <ProdProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ProdProvider>
  </AuthProvider>
);
