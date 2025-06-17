import API from "@/components/functional/axios";
import { Edit2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AdminCreateProduct() {
function imageUrlToFileUsingCanvas(url, filename) {
  let isCancelled = false;

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (isCancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(blob => {
        if (isCancelled || !blob) return;
        const file = new File([blob], filename, { type: blob.type });
        resolve(file);
      }, "image/jpeg");
    };

    img.onerror = (err) => {
      if (!isCancelled) reject(err);
    };

    img.src = url;
  });

  // Return an object with cancel logic in case you're unmounting
  promise.cancel = () => {
    isCancelled = true;
  };

  return promise;
}


useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    stock_count: "",
    price: "",
  });
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);
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


const edit_Product = useAuthStore(s => s.edit_mode)
const fetchProducts = useAuthStore(s => s.fetchProducts)

useEffect(() => {
  let isCancelled = false;
  let imagePromise;

  const loadImage = async () => {
    if (!edit_Product) return;

    setForm({
      title: edit_Product.name || "",
      description: edit_Product.description || "",
      category: edit_Product.category || "",
      stock_count: edit_Product.stock_count || "",
      price: edit_Product.price || "",
    });

    setPreview(edit_Product.image_url);

    imagePromise = imageUrlToFileUsingCanvas(edit_Product.image_url, edit_Product.name);

    try {
      const imageFile = await imagePromise;
      if (!isCancelled) {
        setImage(imageFile);
      }
    } catch (err) {
      console.error("Failed to convert image URL to file:", err);
    }
  };

  loadImage();

  return () => {
    isCancelled = true;
    imagePromise?.cancel?.(); // 💯 cancel if possible
  };
}, []);


  const handleEdit = async (e) => {
    if(!image){
      toast('Please Ensure you add an Image')
      return
    }
    e.preventDefault();
    setIsSubmitting(true);
    let formdata = new FormData();
    formdata.append("name", form.title);
    formdata.append("description", form.description);
    formdata.append("category", form.category);
    formdata.append("price", form.price);
    formdata.append("stock_count", form.stock_count);
    image && formdata.append("image", image, "file")

    try {
      const toastId = toast.loading('Saving Product...')
      const res = await API.put(`/products/${edit_Product.id}`, formdata)
      console.log(res)
      toast.success('Product Saved!', {
      id: toastId
      })

      setForm({
      title: "",
      description: "",
      category: "",
      stock_count: "",
      price: "",
      });
      // Cookies.remove("edit-product")
      fetchProducts()
      navigate('/products')

    } catch (e) {
      console.log(e)
      toast.dismiss() // Stop the toast loading on error
       setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
setIsSubmitting(false);
      setForm({
        title: "",
        description: "",
        category: "",
        stock_count: "",
        price: "",
      });
      navigate('/products') // Uncomment if you have navigate
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a custom class for disabled opacity if not using Tailwind's disabled:opacity-60
  // .input-disabled { opacity: 0.6; pointer-events: none; }

  return (
    <div className="min-h-[80vh] flex items-center justify-center  p-2 my-6 max-md:my-2">
      <form
        onSubmit={edit_Product ? handleEdit : handleSubmit}
        className="w-full max-w-xl flex flex-col gap-3 rounded-xl"
        style={{ background: "none" }}
      >
        <h2 className="mb-4 font-[poppins-bold] text-2xl text-center">{edit_Product ? 'Update Product' : 'Create Product'}</h2>
        <div className="text-center flex flex-col items-center">
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-w-full min-h-28 rounded-lg object-cover mb-2 border border-gray-300"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
                style={{ lineHeight: 0 }}
                tabIndex={-1}
                disabled={isSubmitting}
                aria-label="Edit image"
              >
                {/* Simple pencil SVG icon */}
                <Edit2 className="size-5" />
              </button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current.click()} className="w-full cursor-pointer min-h-24 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center text-gray-400 mb-2 border border-dashed border-gray-300">
              Add Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
        </div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full disabled:opacity-60"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          disabled={isSubmitting}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full resize-vertical disabled:opacity-60"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full disabled:opacity-60"
        />
        <input
          type="number"
          name="stock_count"
          placeholder="Stock Count"
          value={form.stock_count}
          onChange={handleChange}
          required
          min={0}
          disabled={isSubmitting}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full disabled:opacity-60"
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
          disabled={isSubmitting}
          className="p-3 text-sm font-[poppins-medium] rounded-lg border border-[var(--bg-tertiary)] w-full disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[var(--color-primary)] text-white rounded-lg p-3 text-sm font-[poppins-semibold] disabled:opacity-60 hover:bg-emerald-700 transition ${isSubmitting ? "opacity-60 pointer-events-none" : ""}`}
        >
          {edit_Product ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
