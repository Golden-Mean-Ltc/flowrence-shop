
import { Button } from 'react-bootstrap';


import { ToastContainer, toast } from 'react-toastify';

export default function ToastExample() {
    const notify = () => toast.success('Added to cart !', {
        position: "top-left",
        autoClose: 1500,
    });

    return (
        <div className="grid place-items-center h-dvh bg-zinc-900/15">
            <Button onClick={notify}>Notify !</Button>
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={true} 
                newestOnTop={false}
                // closeOnClick={false}
                rtl={false}
                // pauseOnFocusLoss
                // draggable
                // pauseOnHover
                theme="light"
            // transition={Bounce}
            />
        </div>
    );
}
