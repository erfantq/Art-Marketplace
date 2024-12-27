import React, { useState } from "react";

export default function Notification({ notifications }) {
    
    return (
        <div>
            {/* Drawer */}
            <input
                type="checkbox"
                id='drawer-1'
                className="drawer-toggle"
            />

            <label className="overlay" htmlFor='drawer-1'></label>
            <div className="drawer bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label
                        htmlFor='drawer-1'
                        className="btn btn-sm hover:bg-red-400 bg-transparent btn-circle absolute right-2 top-2 text-white"
                    >
                        ✕
                    </label>
                    {/* Data box */}
                    <div>
                        <div className="p-6">
                            <div className="breadcrumbs text-sm">
                                <ul>
                                    <li>
                                        <p>sdv</p>
                                    </li>
                                    <li>
                                        <p>vsd</p>
                                    </li>
                                </ul>
                            </div>
                            {/* <p className="font-semibold text-2xl my-2">
                                {selectArt.name}
                            </p>
                            <p className="text-purple-400 ">
                                Artist : {selectArt.artist.username}
                            </p>
                            <p className="text-sm text-gray-500 my-2">
                                Quantity : {selectArt.number}
                            </p>
                            <p className="text-sm text-gray-400 my-2">
                                Price : ${selectArt.price}
                            </p> */}
                        </div>
                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        <button className="btn btn-ghost">Cancel</button>
                        <button className="btn bg-purple-600 text-white">
                            Purchace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
