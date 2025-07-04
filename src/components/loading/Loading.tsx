
const Loading = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-red-700 rounded-full animate-spin"></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-red-700 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
            </div>
        </div>
    )
}

export default Loading