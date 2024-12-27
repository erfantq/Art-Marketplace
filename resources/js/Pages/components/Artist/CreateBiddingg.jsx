import React, { useEffect, useState } from "react";
import Navbar from "../Share/NavBar";
import { useFormik } from "formik";
import { CreateArtworkSchema, CreateBiddingSchema, WalletChargeSchema } from "../../schemas";
import api from "../../../api/axiosApi";
import { format } from 'date-fns';
import axios from "axios";
import useToastify from "../../../hooks/useToastify";
import { CiCircleAlert } from "react-icons/ci";

export default function CreateBiddingg({ user, arts }) {

  const [btnSubmit, setBtnSubmit] = useState(false);
  const showToast = useToastify()

  const onSubmit = async (values, action) => {
    try {
      const api = axios.create({
        baseURL: '/',
        withCredentials: true
      })
      const response = await api.post("/bidding/add",
        { ...values, end_date: format(new Date(values.end_date), 'yyyy-MM-dd HH:mm:ss') }
      );

      setBtnSubmit(true);
      showToast('success', response.data.message)
      setTimeout(() => {
        setBtnSubmit(false);
        if (response.status === 200) {
          window.location.href = "/"
        }
        // navigate('/home')
      }, 4000);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    console.log("mdmms", arts);
    console.log(user);

  }, [])

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      art_id: "",
      base_price: 100,
      end_date: ""
    },
    validationSchema: CreateBiddingSchema,
    onSubmit,
  });

  const baseInput =
    "w-full px-1 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

  const incorrectInput =
    "max-w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

  const styles = {
    input: {
      valid: {
        grid: " w-full h-9 px-2 py-1 rounded-md ",
        color: " text-sm bg-gray-800 border border-gray-700 ",
        focus: " focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 "
      },
      inValid: {
        grid: " w-full h-9 px-2 py-1 rounded-md ",
        color: " text-sm bg-gray-800 border border-red-700 text-gray-300 ",
        focus: " focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-red-500 "
      }
    },

    span: {
      error: " form-label-alt block text-red-500 "
    },
    div: {
      transition: " transform transition-colors duration-500 ",
      grid: " w-full h-9 px-2 py-2 rounded-md ",
      color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
    },
    buttun: {
      normal: {
        grid: " btn h-9 px-2 py-2 my-4 rounded-md ",
        color: " text-sm font-medium text-white bg-purple-700 "
      },
      submitting: {
        grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md ",
        color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

      }
    }
  }

  return (
    <div>
      <Navbar username={user.username} role={user.role} />
      <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center">
        <div className="grid grid-cols-9">
          {/* Information Box */}
          <div className="col-start-2 col-end-8 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
            <div className="col-span-4">
              <p className="text-4xl font-bold text-center text-gray-100 ">
                Create Biddingg
              </p>
            </div>

            <form onSubmit={handleSubmit}
              className="grid grid-cols-4 gap-3">
              {/* Page Heading */}
              {/*  */}
              <div className="my-4 col-span-4">
                <label
                  htmlFor="art_id"
                  className="block text-sm font-medium text-gray-400"
                >
                  Artwork
                </label>
                <select
                  id="art_id"
                  name="art_id"
                  value={values.art_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.art_id && touched.art_id

                      ? JSON.stringify(styles.input.inValid)
                      : JSON.stringify(styles.input.valid)
                  }
                >
                  <option value="" disabled selected>
                    Select your artwork
                  </option>
                  {arts.map((art) => (
                    <option key={art._id.$oid} value={art._id.$oid}>
                      {art.name}
                    </option>
                  ))}
                </select>

                {errors.art_id && touched.art_id && (
                  <span className="text-red-500 text-xs">
                    {errors.art_id}
                  </span>
                )}
              </div>
              <div className="my-4 col-span-4">
                <label
                  className="block text-sm font-medium text-gray-400"
                  htmlFor="base_price"
                >
                  Basic Price
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  id="base_price"
                  name="base_price"
                  className={
                    errors.base_price && touched.base_price

                      ? JSON.stringify(styles.input.inValid)
                      : JSON.stringify(styles.input.valid)
                  }
                  value={values.base_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.base_price && touched.base_price && (
                  <span className="text-red-500 text-xs col-span-4 mb-4 mt-1">
                    {errors.base_price}
                  </span>
                )}
              </div>
              <div className="my-4 col-span-4">
                <label
                  className="block text-sm font-medium text-gray-400"
                  htmlFor="charge"
                >
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  name="end_date"
                  className={
                    errors.end_date && touched.end_date

                      ? JSON.stringify(styles.input.inValid)
                      : JSON.stringify(styles.input.valid)
                  }
                  value={values.end_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.end_date && touched.end_date && (
                  <span className="text-red-500 text-xs col-span-4 mb-4 mt-1">
                    {errors.end_date}
                  </span>
                )}
              </div>
              <div className="col-span-4">

                <button
                  type="submit"
                  className={btnSubmit
                    ? JSON.stringify(styles.buttun.submitting)
                    : JSON.stringify(styles.buttun.normal) + ' w-full '}
                >
                  {btnSubmit ? "Creating..." : "Create"}
                  {btnSubmit && (<div className="ml-2 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                    <div className="spinner-pulse-dot"></div>
                  </div>)}
                </button>
              </div>

              {/* Edit Profile Button */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
