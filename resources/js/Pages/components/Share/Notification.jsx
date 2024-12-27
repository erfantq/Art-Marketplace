import React, { useEffect, useState } from "react";

export default function Notification({ notifications }) {

    useEffect(() => {
        console.log("notiff", notifications);
    }, [])
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
                    {notifications.map((notif, index) => (
                        <div key={notif._id.$oid}>
                            <div className="p-6 border-b-2">
                                <p className="font-semibold text-2xl my-2">
                                    item :  {notif.item_name}
                            </p>
                                <p className="text-white ">
                                    message : {notif.message}
                            </p>
                            <p className="text-sm text-gray-400 my-2">
                                    username : {notif.username}
                                </p>
                        </div>
                    </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
