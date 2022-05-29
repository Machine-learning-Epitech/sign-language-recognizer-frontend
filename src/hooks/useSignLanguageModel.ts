import { useMutation } from "react-query";
export const useSignLanguageModel = () => {
    const {data, isLoading, mutate}= useMutation((image: File) => {
      const formData = new FormData();
      formData.append('file', image);
        return fetch('http://localhost:5002/predict', {
            method: 'POST',
            body: formData,
        }).then(response => response.json());
      })
    return {
        predictSign: mutate,
        data,
        isLoading,
    }
}