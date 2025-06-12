import { useState, useRef } from "react";

/**
 * useFormValidation - Handles single-page forms with optional image input and preview
 *
 * @param {object} initialValues - e.g. { username: "", password: "", image: null }
 * @param {function} validateFn - (name, value) => errorMessage | null
 * @param {function} onSubmit - Called when form is valid
 */
function useFormValidation(initialValues, validateFn, onSubmit) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let newValue = value;

    if (type === "file") {
      const file = files[0];
      newValue = file || null;
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));

    const error = validateFn(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateFn(key, form[key]);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
    }
  };

  const triggerImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return {
    form,
    errors,
    imagePreview,
    handleChange,
    handleSubmit,
    imageInputRef,
    triggerImageInput,
  };
}

export default useFormValidation;



//BONUS
// function validate(name, value) {
//   switch(name) {
//     case "username":
//       if (!value || value.length < 3) return "Username must be at least 3 characters";
//       break;
//     case "password":
//       if (!value || value.length < 6) return "Password must be at least 6 characters";
//       break;
//     // more cases ...
//   }
//   return null; // no error
// }


//USAGE
// import useFormValidation from "./useFormValidation";

// function SignupForm() {
//   const initialValues = {
//     username: "",
//     email: "",
//     password: "",
//     image: null, // Optional
//   };

//   const validate = (name, value) => {
//     if (name === "username" && value.length < 3) return "Too short";
//     if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
//     if (name === "password" && value.length < 6) return "Weak password";
//     return null;
//   };

//   const handleFormSubmit = (formData) => {
//     console.log("Submitted:", formData);
//     // example: use formData.image for uploading file
//   };

//   const {
//     form,
//     errors,
//     imagePreview,
//     handleChange,
//     handleSubmit,
//     imageInputRef,
//     triggerImageInput,
//   } = useFormValidation(initialValues, validate, handleFormSubmit);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <input
//         name="username"
//         placeholder="Username"
//         value={form.username}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />
//       {errors.username && <p className="text-red-500">{errors.username}</p>}

//       <input
//         name="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />
//       {errors.email && <p className="text-red-500">{errors.email}</p>}

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />
//       {errors.password && <p className="text-red-500">{errors.password}</p>}

//       {/* 👇 Optional Image Upload */}
//       <input
//         type="file"
//         name="image"
//         accept="image/*"
//         ref={imageInputRef}
//         onChange={handleChange}
//         className="hidden"
//       />

//       <div onClick={triggerImageInput} className="cursor-pointer border w-32 h-32 flex items-center justify-center text-sm text-gray-500">
//         {imagePreview ? (
//           <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
//         ) : (
//           "Upload Image"
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={Object.values(errors).some(Boolean)}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// }

// export default SignupForm;
