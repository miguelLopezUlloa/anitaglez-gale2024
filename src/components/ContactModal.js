import { useState, useEffect } from "react";
import axios from "axios";

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Resetear el formulario cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({ full_name: "", email: "", message: "" });
      setErrors({});
    }
  }, [isOpen]);

  const validateField = (name, value) => {
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    // Validar todos los campos antes del envío
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (Object.keys(errors).length > 0) return;

    const requestBody = {
      body: JSON.stringify(formData),
    };

    try {
      const response = await axios.post(
        "https://74ftjvitlg.execute-api.us-east-2.amazonaws.com/default",
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      alert("Message sent successfully!");
      onClose(); // Cerrar el modal al enviar correctamente
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Botón de cierre (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600"
          aria-label="Close Modal"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Contact Us
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              value={formData.full_name}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              value={formData.message}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-white rounded-md"
              style={{
                backgroundColor: "#284756",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
