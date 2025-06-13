import API from "@/components/functional/axios";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminCreateProduct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    stock_count: "",
    price: "",
  });
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", form.title);
    formdata.append("description", form.description);
    formdata.append("category", form.category);
    formdata.append("price", form.price);
    formdata.append("stock_count", form.stock_count);
    image && formdata.append("image", image, "file")

    try {
      const toastId = toast.loading('Creating Product...')
      const res = await API.post('/products', formdata)
      console.log(res)
      toast.success('Product Created!', {
        id: toastId
      })
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center  p-2 my-6 max-md:my-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-3 rounded-xl"
        style={{ background: "none" }}
      >
       <h2 className="mb-4 font-[poppins-bold] text-2xl text-center">Create Product</h2>
        <div className="text-center flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-full min-h-28 rounded-lg object-cover mb-2 border border-gray-300"
            />
          ) : (
            <div className="w-full min-h-12 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center text-gray-400 mb-2 border border-dashed border-gray-300">
              No Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-1 px-4 py-3 bg-[var(--color-primary)] font-[poppins-medium] text-sm w-full text-white rounded-lg hover:bg-emerald-700 transition"
          >
            {image ? "Change Image" : "Add Image"}
          </button>
        </div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full resize-vertical"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full"
        />
        <input
          type="number"
          name="stock_count"
          placeholder="Stock Count"
          value={form.stock_count}
          onChange={handleChange}
          required
          min={0}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min={0}
          step="0.01"
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full"
        />
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white rounded-lg p-3 text-sm font-[poppins-semibold] hover:bg-emerald-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
