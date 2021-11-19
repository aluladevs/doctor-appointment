import AppBar from "./AppBar";

export default function Layout({ children }) {
    return (
        <div>
            <AppBar/>

            <div>
                {children}
            </div>

            <footer className="h-20 mt-16">
                Footer
            </footer>
        </div>
    )
}