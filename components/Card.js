
export default function Card({ children, className }) {
    return (
        <div className={`p-5 bg-white card ${className ?? ''}`}>
            {children}
        </div>
    )
}