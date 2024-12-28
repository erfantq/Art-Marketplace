import React, { useEffect, useState } from "react";
import Navbar from "../Share/NavBar";
import { useFormik } from "formik";
import { ArtworkCommentSchema, SuggestBiddingSchema } from "../../schemas";
import { CiImageOff } from "react-icons/ci";
import axios from "axios";
import useToastify from "../../../hooks/useToastify";
import ShowComments from '../Artworks/ShowComments'
import { format } from "date-fns";
export default function SuggestBidding({ bidding, user, art }) {
    // const [comments, setComments] = useState(art.reviews);
    const [btnSubmit, setBtnSubmit] = useState(false);
    const [imgError, setImgError] = useState(false)
    const [formattedDate, setFormattedDate] = useState('');
    const showToast = useToastify()
    const dateObject = bidding?.end_time
        ? new Date(bidding.end_time * 1000)
        : null;

    useEffect(() => {
        // console.log(bidding);
        // const dateObject = new Date(bidding.end_time * 1000)
        // setFormattedDate(dateObject, 'yyyy-MM-dd HH:mm:ss')
        if (dateObject) {
            const formatted = format(dateObject, 'yyyy-MM-dd HH:mm:ss');
            setFormattedDate(formatted);
        } else {
            setFormattedDate("Invalid Date");
        }
    }, []);

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
        div: {
            transition: " transform transition-colors duration-500 ",
            grid: " w-full h-9 px-2 py-2 rounded-md ",
            color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
        },
        buttun: {
            normal: {
                grid: "  btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: "  btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        },
        span: {
            error: " form-label-alt block text-red-500 text-md "
        },
        textarea: {
            valid: {
                grid: " bg-gray-800 w-full rounded-md ",
                color: " w-full p-3 text-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 "
            },
            inValid: {
                grid: " bg-gray-800 w-full rounded-md ",
                color: " w-full p-3 text-gray-600 border-2 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 "
            }
        }
    }


    const onSubmit = async (values) => {
        try {
            const api = axios.create({
                baseURL: '/',
                withCredentials: true
            })

            const response = await api.post('/bidding/suggest', values)
            showToast('success', 'Added your suggest ')
            // setComments((prevComments) => setComments(...prevComments, response.data.comment))
            setBtnSubmit(true)
            setTimeout(() => {
                setBtnSubmit(false)
            }, 5000);
        } catch (error) {
            showToast('error', error.response?.data.message)
        }
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            price: 100,
            artId: art._id.$oid
        },
        validationSchema: SuggestBiddingSchema,
        onSubmit
    })

    return (
        <div>
            <Navbar username={user.username} role={user.role} />

            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 items-center justify-center mt-10">
                <div className="grid grid-cols-12">
                    {/* Information Box */}
                    <div className="col-start-2 col-end-8 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="grid grid-cols-6 gap-4">

                            {/* <div className='col-span-2'> */}
                            <div className="col-span-5">
                                <p className="text-4xl font-bold text-left text-gray-100 ">
                                    {art.name}
                                </p>
                                <h2 className="text-xl font-medium text-left mb-12 text-purple-400">
                                    Created by :  {art.artist.username}
                                </h2>
                            </div>

                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Base Price
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {bidding.base_price}
                                </div>
                            </div>


                            {/* Account Info Display */}
                            <div className="col-start-4 col-end-7">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Highest Suggestion
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {bidding.highest_suggestion}
                                </div>
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    End Time
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {formattedDate.toString()}
                                </div>
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Sold Number
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {art.sold_number}
                                </div>
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Winner Now
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {bidding.winner}
                                </div>
                            </div>
                            {/* <div className="col-span-3">

                                <label
                                    htmlFor="modal-1"
                                    type="button"
                                    className={JSON.stringify(styles.buttun.normal) + " w-full  "}
                                >
                                    Purchuse
                                </label>

                            </div>
                            <div className="col-span-3">

                                <button
                                    type="button"
                                    disabled
                                    className={JSON.stringify(styles.buttun.normal) + " w-full "}
                                >
                                    Bidding
                                </button>

                            </div> */}
                            {/* <PurchaseArtwork art={art} user={user} /> */}
                            {/* Comments Section */}
                            {/* <CommentSection comments={comments} onAddComment={handleAddComment} /> */}
                            {/* Comment Section */}
                            <form onSubmit={handleSubmit} className="col-span-full">

                                <div className="my-4 col-span-4">
                                    <label
                                        className="block text-sm font-medium text-gray-400 mb-2"
                                        htmlFor="price"
                                    >
                                        Price Suggust
                                    </label>
                                    <input
                                        type="number"
                                        min="100"
                                        step="100"
                                        id="price"
                                        name="price"
                                        className={
                                            errors.price && touched.price

                                                ? JSON.stringify(styles.input.inValid)
                                                : JSON.stringify(styles.input.valid)
                                        }
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {errors.price && touched.price && (
                                        <span className="text-red-500 text-xs col-span-4 mb-4 mt-1">
                                            {errors.price}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className={btnSubmit
                                        ? JSON.stringify(styles.buttun.submitting)
                                        : JSON.stringify(styles.buttun.normal)}
                                >
                                    {btnSubmit ? "Adding..." : "Add Suggest"}
                                    {btnSubmit && (<div className="ml-1 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                                        <div className="spinner-pulse-dot"></div>
                                    </div>)}


                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Image */}
                    <div className="image-container col-span-4 mx-5 mt-10 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                        {!imgError && <img
                            className="w-full h-full object-cover rounded-lg my-2"
                            src="https://img.cdn-pictorem.com/uploads/collection/D/DN4DFF8JRC/900_Nature-Art_10.jpg"
                            alt="avatar"
                            onError={() => setImgError(true)}
                        />}
                        {imgError && (
                            <CiImageOff className="w-full h-full object-cover rounded-lg my-2 text-gray-200 opacity-20" />)
                        }
                    </div>

                    <ShowComments comments={art.reviews} />
                </div>
            </div>
        </div>
    );
}
