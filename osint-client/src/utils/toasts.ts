import toast from "react-hot-toast";

export const oneTimeErrorToast = (message: string, id: string) => {
  toast.dismiss(id);
  toast.error(message, {
    id,
    style: {
      borderRadius: "12px",
      background: "#333",
      fontWeight: 500,
      color: "crimson",
    },
  });
};
