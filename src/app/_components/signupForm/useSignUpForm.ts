import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { SignUpResponse, SignUpUser } from "@/app/(Authentication)/Auth.types";
import axios from "axios";
import { useRouter } from "next/navigation";
export const useSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  let passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const [error, setError] = useState<string | null>(null);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("E-mail should include '@' to be valid.")
      .required("E-mail is required"),
    name: Yup.string()
      .required("Name is required")
      .min(8, "Name must be at least 8 characters"),
    password: Yup.string()
      .min(8, "")
      .required("Password is required")
      .matches(
        passwordRegex,
        "minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-Password is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values: SignUpUser) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post<SignUpResponse>(
        "https://linked-posts.routemisr.com/users/signup",
        values,
      );
      toast.success("Account Created Successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data.error);
      toast.error("Sign Up failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const userObj: SignUpUser = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };

  const formikObj = useFormik({
    initialValues: userObj,
    onSubmit: handleSubmit,
    validationSchema,
  });
  return {
    formikObj,
    showPassword,
    showPassword2,
    handleClickShowPassword,
    handleClickShowPassword2,
    handleMouseDownPassword,
    handleMouseDownPassword2,
    handleMouseUpPassword,
    handleMouseUpPassword2,
    isLoading,
    error,
  };
};
