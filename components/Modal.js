import Card from "./Card";
import {XIcon} from "@heroicons/react/solid";

export default function Modal({ children, open, title, onClose }) {

    if (open) {
        return (
            <div className="fixed w-full h-full z-20 top-0 left-0">
                <div className="absolute z-20 top-0 left-0 w-screen h-full bg-black opacity-30" onClick={onClose}/>
                <div className="absolute z-30 top-0 left-0 w-screen h-full flex items-center justify-center">
                    <Card className="p-10">
                        <div className="mb-8 flex justify-between items-center">
                            <h1 className="text-xl">{title ?? ''}</h1>
                            <button onClick={onClose}>
                                <XIcon className="h-5 w-5 text-gray-700"/>
                            </button>
                        </div>
                        {children}
                    </Card>
                </div>
            </div>
        )
    }

    return <div/>
}