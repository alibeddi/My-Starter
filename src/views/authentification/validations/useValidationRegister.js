import * as Yup from "yup";
import dayjs from "dayjs";

const max = dayjs(new Date()).format("YYYY-MM-DD");

const useValidations = () => {
  const minAge = new Date();
  minAge.setFullYear(minAge.getFullYear() - 5);

  const maxAge = new Date();
  maxAge.setFullYear(maxAge.getFullYear() - 75);

  const validations = {
    first_name: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .matches(
        /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀa-zA-Zء-ي ]+$/,
        "Please enter a valid first name"
      )
      .matches(
        /[^\s*].*[^\s*]/g,
        "First name cannot start or end with a blank space"
      )
      .required("First name is required"),
    last_name: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .matches(
        /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀa-zA-Zء-ي ]+$/,
        "Please enter a valid last name"
      )
      .matches(
        /[^\s*].*[^\s*]/g,
        "Last name cannot start or end with a blank space"
      )
      .required("Last name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^[0-9]{8,}$/, "Please enter a valid phone number")
      .min(8, "Phone number must be at least 8 digits")
      .required("Phone number is required"),
    government_id: Yup.number().required("Government ID is required"),
    classes: Yup.array(Yup.number().required()).required(
      "Classes are required"
    ),
    birth_date: Yup.date()
      .min(maxAge, `Birthday must be before ${maxAge}`)
      .max(minAge, `Birthday must be after ${minAge}`)
      .required("Birth date is required"),
    postal_code: Yup.string()
      .matches(/^[0-9]+$/, "Postal code must contain only digits")
      .min(4, "Postal code must be 4 digits")
      .max(4, "Postal code must be 4 digits")
      .nullable(),
  };

  return validations;
};

export default useValidations;
