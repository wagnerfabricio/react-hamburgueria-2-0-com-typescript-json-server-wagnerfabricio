import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./AuthContext";

import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { ProdProvider } from "./ProdContext";
import { CartProvider } from "./CartContext";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <ProdProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ProdProvider>
    </AuthProvider>
  </ChakraProvider>
);
