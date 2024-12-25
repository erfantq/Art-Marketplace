import React, { useEffect, useState } from "react";
import Navbar from "../Share/NavBar";
import CommentSection from "./CommentSection"; // Importing CommentSection
import { useFormik } from "formik";
import { ArtworkCommentSchema } from "../../schemas";
import { CiImageOff } from "react-icons/ci";
import ShowComments from "./ShowComments";
import axios from "axios";
import useToastify from "../../../hooks/useToastify";

export default function SelectedArtwork({ art, user }) {
    // const [comments, setComments] = useState(art.reviews);
    const [btnSubmit, setBtnSubmit] = useState(false);
    const [imgError, setImgError] = useState(false)
    const [newComment, setNewComment] = useState()
    const showToast = useToastify()
    useEffect(() => {
        console.log(art);
        // setComments(art.reviews)
        // console.log("comment", comments);
        // Load existing comments if needed (e.g., from an API)
    }, []);
    const styles = {
        div: {
            transition: " transform transition-colors duration-500 ",
            grid: " w-full h-9 px-2 py-2 rounded-md ",
            color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
        },
        buttun: {
            normal: {
                grid: " w-1/2 btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: " w-1/2 btn h-9 px-2 py-2 my-4 rounded-md spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)] ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        },
        span: {
            error: " form-label-alt block text-red-500 text-md "
        },
        textarea: {
            valid: {
                grid: " bg-gray-800 w-full rounded-md ",
                color: " w-full p-3 text-gray-600 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 "
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

            const response = await api.post('/product/' + art._id.$oid + '/comment', values)
            showToast('success', 'Registered your comment')
            console.log("ress", response);
            setNewComment(response.data.comment)
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
            comment: "",
            rate: 0
        },
        validationSchema: ArtworkCommentSchema,
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
                                    Price
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {art.price}
                                </div>
                            </div>


                            {/* Account Info Display */}
                            <div className="col-start-4 col-end-7">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Sold number
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {art.sold_number}
                                </div>
                            </div>
                            <div className="col-span-full ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                >
                                    Number
                                </label>
                                <div className={JSON.stringify(styles.div)}>
                                    {art.number}
                                </div>
                            </div>
                            {/* Comments Section */}
                            {/* <CommentSection comments={comments} onAddComment={handleAddComment} /> */}
                            {/* Comment Section */}
                            <form onSubmit={handleSubmit} className="col-span-full">
                                <label
                                    className="block mb-2 text-md font-medium text-gray-400"
                                    htmlFor="comment"
                                >
                                    Add Comment
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows="3"
                                    className={
                                        errors.comment && touched.comment

                                            ? JSON.stringify(styles.textarea.inValid)
                                            : JSON.stringify(styles.textarea.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.comment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.comment && touched.comment && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.comment}
                                    </span>
                                )}
                                <button
                                    type="submit"
                                    className={btnSubmit
                                        ? JSON.stringify(styles.buttun.submitting)
                                        : JSON.stringify(styles.buttun.normal)}
                                >

                                    {btnSubmit ? "Updating..." : "Add Comment"}
                                    <div className="spinner-pulse-dot"></div>

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
