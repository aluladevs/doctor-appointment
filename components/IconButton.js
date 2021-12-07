export default function IconButton({ children, color, onClick, transparent }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded-lg
            ${!transparent && `shadow bg-${color ?? "white"}`}`}>
            {children}
        </button>
    )
}