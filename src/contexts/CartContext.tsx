import { useToast } from "@chakra-ui/react";
import { userInfo } from "os";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";
import { useProd } from "./ProdContext";

interface CartContextProps {
  children: ReactNode;
}

interface iProduct {
  id: number;
  userId: string;
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartData {
  cart: iProduct[];
  cartQty: number;
  cartTotal: number;
  isCartLoading: boolean;
  setIsCartLoading: (value: boolean) => void;
  getCart: () => Promise<void>;
  addToCart: (prodId: number) => Promise<void>;
  subFromCart: (product: iProduct) => Promise<void>;
  removeFromCart: (prodId: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartData>({} as CartData);

export const CartProvider = ({ children }: CartContextProps) => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartQty, setCartQty] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const { user, accessToken, signOut } = useAuth();

  const { products } = useProd();

  const toast = useToast();

  const getCart = useCallback(async () => {
    return await api
      .get(`/users/${user.id}?_embed=cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const newCart = [...cart, ...res.data.cart];
        setCart(newCart);
        setIsCartLoading(false);
      })
      .catch((err) => {
        setIsCartLoading(false);
        toast({
          position: "top",
          title: "Ooops...",
          description:
            "Você foi deslogado, faça o login novamente para continuar comprando...",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(
    async (prodId: number) => {
      setIsCartLoading(true);
      const isProductOnCart = cart.find((item) => item.prodId === prodId);

      if (isProductOnCart) {
        const newQty = isProductOnCart.quantity + 1;
        const data = { quantity: newQty };
        await api
          .patch(`/cart/${isProductOnCart.id}`, data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((_) => getCart())
          .catch((_) => {
            setIsCartLoading(false);
            toast({
              position: "top",
              title: "Ooops...",
              description:
                "Não foi possível adicionar o produto ao carrinho, parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          });

        return;
      }

      const newProduct = products.find((product) => product.prodId === prodId);
      if (newProduct) {
        await api
          .post(
            "/cart",
            { ...newProduct, quantity: 1, userId: user.id },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            getCart();
          })
          .catch((_) => {
            setIsCartLoading(false);
            toast({
              position: "top",
              title: "Ooops...",
              description:
                "Não foi possível adicionar o produto ao carrinho, parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const removeFromCart = useCallback(
    async (id: number) => {
      setIsCartLoading(true);

      await api
        .delete(`/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => getCart())
        .catch((_) => {
          setIsCartLoading(false);
          toast({
            position: "top",
            title: "Ooops...",
            description:
              "Não foi possível remover o produto, parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
    },
    [cart]
  );

  const subFromCart = useCallback(
    async (product: iProduct) => {
      setIsCartLoading(true);
      const newQty = product.quantity - 1;

      if (newQty === 0) {
        removeFromCart(product.id);
        return;
      }

      const data = { quantity: newQty };

      await api
        .patch(`/cart/${product.id}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => getCart())
        .catch((_) => {
          setIsCartLoading(false);
          toast({
            position: "top",
            title: "Ooops...",
            description:
              "Não foi possível alterar o produto, parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [cart]
  );

  const clearCart = useCallback(() => {
    setIsCartLoading(true);

    cart.forEach(async (item) => {
      await api.delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    setCart([]);
    setIsCartLoading(false);
  }, [cart]);

  const qtyOfProducts = () => {
    let total = 0;
    cart.forEach((product) => {
      total = total + product.quantity;
    });

    return setCartQty(total);
  };

  const calcTotal = () => {
    let total = 0;

    cart.forEach((item) => {
      const subTotal = item.quantity * item.price;
      total += subTotal;
    });

    setCartTotal(total);
  };

  useEffect(() => {
    qtyOfProducts();
    calcTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoading,
        setIsCartLoading,
        cartQty,
        cartTotal,
        getCart,
        addToCart,
        subFromCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
