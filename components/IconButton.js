export default function IconButton({ children, color }) {
    return (
        <button className={`p-2 rounded-lg shadow-md bg-${color ?? "white"}`}>
            {children}
        </button>
    )
}