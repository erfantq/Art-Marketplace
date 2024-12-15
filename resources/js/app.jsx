import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";

createInertiaApp({
    resolve: () => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/Home.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <UserProvider>
                <App {...props} />
            </UserProvider>
        );
    },
});
