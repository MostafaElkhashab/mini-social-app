import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { LoginUser } from "@/app/(Authentication)/Auth.types";

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("E-mail should include '@' to be valid.")
      .required("E-mail is required"),
  });

  const handleSubmit = async (values: LoginUser) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values,
      );
      toast.success("Login Successfully");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const userObj: LoginUser = { email: "", password: "" };

  const formikObj = useFormik({
    initialValues: userObj,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return {
    showPassword,
    isLoading,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    formikObj,
  };
};
