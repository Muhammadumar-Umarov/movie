import {  Film } from "lucide-react"
import Button from "antd/es/button/button-group"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <Film className="w-24 h-24 text-red-700 mx-auto mb-4" />
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the
                        wrong URL.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button className="w-full bg-red-700 hover:bg-red-800 text-white py-4">
                        <Link to={"/"} style={{color: "white"}}>
                            Back to Home
                        </Link>
                    </Button>

                    <Button
                        className="w-full border-red-700 text-red-700 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent py-4">
                        <Link to={"/movies"}>
                            Browse Movies
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}