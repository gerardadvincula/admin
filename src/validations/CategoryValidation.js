import * as yup from "yup";

export const categorySchema = yup.object().shape({
  categoryName: yup.string().required("required"),
  description: yup.string().required("required"),
  imageUrl: yup.string().required("required"),
});
