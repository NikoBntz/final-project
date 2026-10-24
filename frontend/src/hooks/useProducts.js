import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../services/api";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const activeRequest = useRef({ controller: null, id: 0 });

  const loadProducts = useCallback((signal) => {
    const requestId = activeRequest.current.id + 1;
    activeRequest.current.id = requestId;
    setError("");
    setStatus("loading");

    getProducts({ signal })
      .then((data) => {
        if (requestId !== activeRequest.current.id) return;
        setProducts(data);
        setStatus("success");
      })
      .catch((requestError) => {
        if (requestError.name === "AbortError" || requestId !== activeRequest.current.id) return;
        setError(requestError.message);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const requestController = activeRequest.current;
    requestController.controller = controller;
    // Initial request synchronizes remote catalog data with local state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts(controller.signal);
    return () => {
      controller.abort();
      if (requestController.controller === controller) {
        requestController.controller = null;
      }
    };
  }, [loadProducts]);

  const retry = useCallback(() => {
    activeRequest.current.controller?.abort();
    const controller = new AbortController();
    activeRequest.current.controller = controller;
    loadProducts(controller.signal);
  }, [loadProducts]);

  return { products, status, error, retry };
}
