import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import {backendUrl} from "../App"
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const images = [image1, image2, image3, image4];
  const setImages = [setImage1, setImage2, setImage3, setImage4];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);1
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <main>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        <div>
          <p className="mb-2 font-medium text-sm">Upload Images</p>
          <div className="flex gap-2">
            {["image1", "image2", "image3", "image4"].map((imageName, idx) => {
              const currentFile = images[idx];
              const setCurrent = setImages[idx];
              return (
                <label key={idx} htmlFor={imageName} className="cursor-pointer">
                  <img
                    src={
                      !currentFile
                        ? assets.upload_area
                        : URL.createObjectURL(currentFile)
                    }
                    alt=""
                    className="w-20"
                  />
                  <input
                    id={imageName}
                    type="file"
                    hidden
                    onChange={(e) => setCurrent(e.target.files[0])}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* ----input feilds------ */}

        <div className="w-full">
          <p className="mb-2 font-medium text-sm">Product Name</p>
          <input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            // onChange={setProductValue}
            // value={productData.name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2 font-medium text-sm">Product Description</p>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            // onChange={setProductValue}
            // value={productData.description}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Write product description"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 w-full">
          <div>
            <p className="mb-2 font-medium text-sm">Product Category</p>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              // onChange={setProductValue}
              // value={productData.category}
              className="w-full px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm">Product SubCategory</p>
            <select
              name="subCategory"
              onChange={(e) => setSubCategory(e.target.value)}
              // onChange={setProductValue}
              // value={productData.subCategory}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p
              className="mb-2 font-medium text-sm"
             
            >
              Product Price
            </p>

            <input
              name="price"
             onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full max-w-[500px] px-3 py-2"
              type="number"
              placeholder="25SR"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-sm ">Product Sizes</p>

          <div className="flex gap-2.5">
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("s")
                    ? prev.filter((item) => item !== "s")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
                } cursor-pointer font-semibold  py-1 px-3`}
              >
                S
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
                } cursor-pointer font-semibold  py-1 px-3`}
              >
                M
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
                } cursor-pointer font-semibold  py-1 px-3`}
              >
                L
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
                } cursor-pointer font-semibold  py-1 px-3`}
              >
                XL
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
                } cursor-pointer font-semibold  py-1 px-3`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            name="bestseller"
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            // onChange={setProductValue}
            // value={productData.bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button
          className="uppercase bg-black text-white px-3 py-3 rounded"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </main>
  );
};

export default Add;
