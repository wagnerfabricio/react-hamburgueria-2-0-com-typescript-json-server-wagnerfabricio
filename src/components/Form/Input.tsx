import {
  FormControl,
  InputGroup,
  Input as ChakraInput,
  FormErrorMessage,
  FormLabel,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  useCallback,
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  textLabel?: string;
  error?: FieldError | null;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "red.error",
  default: "transparent",
  focus: "gray.600",
  filled: "green.success",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, textLabel, placeholder, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup flexDirection="column">
        <FormLabel
          opacity={variation !== "default" ? "100" : "0"}
          color={
            inputVariation[variation] === "transparent"
              ? "gray.300"
              : inputVariation[variation]
          }
          fontSize="12px"
          mb="-10px"
          ml="14px"
          padding="0px 4px"
          zIndex="2"
          bgColor="white"
          w="fit-content"
          borderRadius="8px"
        >
          {textLabel}
        </FormLabel>
        <ChakraInput
          id={name}
          name={name}
          onChangeCapture={(event) => setValue(event.currentTarget.value)}
          placeholder={variation === "default" ? placeholder : ""}
          onBlurCapture={handleInputBlur}
          onFocus={handleInputFocus}
          w="100%"
          h="60px"
          bgColor={variation === "default" ? "gray.0" : "white"}
          borderColor={inputVariation[variation]}
          border="2px solid"
          borderRadius="8px"
          ref={ref}
          _focus={{
            bgColor: "white",
          }}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage fontSize="xs">{error.message}</FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
