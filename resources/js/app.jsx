// import './bootstrap';
// import '../css/app.css';

// import { createInertiaApp } from '@inertiajs/react'
// import { createRoot } from "react-dom/client";
// import { UserProvider } from "./context/UserContext";
// import { ToastContainer } from 'react-toastify';
// createInertiaApp({
//     resolve: () => {
//         const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
//         return pages[`./Pages/Home.jsx`];
//     },
//     setup({ el, App, props }) {
//         createRoot(el).render(
//             <UserProvider>
//                 <ToastContainer />
//                 <App {...props} />
//             </UserProvider>
//         );

//     },
// });


// // import './bootstrap';
// // import '../css/app.css';
// // import { createInertiaApp } from '@inertiajs/react'
// // import { createRoot } from 'react-dom/client'
// // createInertiaApp({
// //   resolve: name => {
// //     const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
// //     return pages[`./Pages/${name}.jsx`]
// //   },
// //   setup({ el, App, props }) {
// //     createRoot(el).render(<App {...props} />)
// //   },
// // })


import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./context/UserContext";
import Home from './Pages/Home';
createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <UserProvider>
                <ToastContainer />
                <App {...props} />
                {/* <Home /> */}
            </UserProvider>)
    },
})