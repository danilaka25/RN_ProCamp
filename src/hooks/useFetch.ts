import { useState, useEffect } from "react";

interface IState {
  loading: boolean,
  data: object | undefined
  error: object| undefined
}

const useFetch = (url: RequestInfo, options: RequestInit | undefined) => {
  const [status, setStatus] = useState<IState>({
    loading: false,
    data: undefined,
    error: undefined
  });

  function fetchNow(url: RequestInfo, options: RequestInit | undefined) {
    setStatus({ loading: true,  data: undefined, error: undefined});
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        //console.log("res", res.response)
        setStatus({ loading: false, data: res.response, error: undefined });
      })
      .catch((err) => {
        setStatus({ loading: false, data: undefined, error: err });
      });
  }

  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, []);

  return { ...status, fetchNow };
}

export default useFetch