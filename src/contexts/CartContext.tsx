import { useToast } from "@chakra-ui/react";
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

interface addNewProduct {
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface CartData {
  cart: iProduct[];
  cartQty: number;
  cartTotal: number;
  getCart: () => Promise<void>;
  addToCart: (newProduct: iProduct | addNewProduct) => Promise<void>;
  subFromCart: (product: iProduct) => Promise<void>;
  removeFromCart: (prodId: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartData>({} as CartData);

export const CartProvider = ({ children }: CartContextProps) => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [cartQty, setCartQty] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const { user, accessToken, signOut } = useAuth();


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
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Ooops...",
          description:
            "Você foi deslogado, faça o login novamente para continuar comprando...",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        signOut()
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(
    async (newProduct: iProduct | addNewProduct) => {
      const isProductOnCart = cart.find(
        (item) => item.prodId === newProduct.prodId
      );

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const removeFromCart = useCallback(
    async (id: number) => {
      await api
        .delete(`/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => getCart())
        .catch((err) => console.log(err));
      getCart();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const subFromCart = useCallback(async (product: iProduct) => {
    const newQty = product.quantity - 1;

    if (newQty === 0) {
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
  }, [cart]);

  const clearCart = useCallback(() => {

    cart.forEach(async (item) => {
      await api.delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    setCart([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
