import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface ProdProviderProps {
  children: ReactNode;
}

interface iProduct {
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface ProdContextData {
  products: iProduct[];
  getProducts: () => Promise<void>;
  searchProducts: (productName: string) => Promise<void>;
}

const ProdContext = createContext<ProdContextData>({} as ProdContextData);

export const ProdProvider = ({ children }: ProdProviderProps) => {
  const [products, setProducts] = useState<iProduct[]>([]);

  const getProducts = useCallback(async () => {
    await api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchProducts = useCallback(async (productName: string) => {
    await api
      .get(`products?name_like=${productName}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ProdContext.Provider value={{ products, getProducts, searchProducts }}>
      {children}
    </ProdContext.Provider>
  );
};

export const useProd = () => useContext(ProdContext);
