"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../lib/store"
import type { IMovie } from "../../types"
import { toggleWishlist } from "../../lib/features/wishlistSlice"

const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const EnhancedSaved = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const wishlist = useSelector((state: RootState) => state.wishlistSlice.value)

    // Filter and search states
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("recent")
    const [filterByRating, setFilterByRating] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // Filter and sort movies
    const filteredAndSortedMovies = useMemo(() => {
        let filtered = wishlist.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))

        // Filter by rating
        if (filterByRating !== "all") {
            const minRating = Number.parseFloat(filterByRating)
            filtered = filtered.filter((movie) => movie.vote_average >= minRating)
        }

        // Sort movies
        switch (sortBy) {
            case "title":
                filtered.sort((a, b) => a.title.localeCompare(b.title))
                break
            case "rating":
                filtered.sort((a, b) => b.vote_average - a.vote_average)
                break
            case "year":
                filtered.sort((a, b) => {
                    const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0
                    const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0
                    return yearB - yearA
                })
                break
            default: // recent
                break
        }

        return filtered
    }, [wishlist, searchTerm, sortBy, filterByRating])

    const handleRemoveFromWishlist = (movie: IMovie, e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(toggleWishlist(movie))
    }

    const formatRating = (rating: number) => {
        return rating ? rating.toFixed(1) : "N/A"
    }

    const getYear = (dateString: string) => {
        return dateString ? new Date(dateString).getFullYear() : "TBA"
    }

    const getImageSrc = (movie: IMovie) => {
        if (movie.poster_path) {
            return IMAGE_URL + movie.poster_path
        }
        return `https://via.placeholder.com/300x450/374151/9CA3AF?text=${encodeURIComponent(movie.title)}`
    }

    // Empty state component
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Saved Movies</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
                Start building your collection by saving movies you want to watch later.
            </p>
            <button
                className="bg-primary hover:bg-secondary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                onClick={() => navigate("/movies")}
            >
                Discover Movies
            </button>
        </div>
    )

    if (wishlist.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <EmptyState />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-foreground mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    My Saved Movies
                </h1>
                <p className="text-muted-foreground" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {wishlist.length} movie{wishlist.length !== 1 ? "s" : ""} in your collection
                </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Search your saved movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring max-w-xs"
                            style={{ fontFamily: "Open Sans, sans-serif" }}
                        />

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
                        >
                            <option value="recent">Recently Added</option>
                            <option value="title">Title A-Z</option>
                            <option value="rating">Highest Rated</option>
                            <option value="year">Release Year</option>
                        </select>

                        <select
                            value={filterByRating}
                            onChange={(e) => setFilterByRating(e.target.value)}
                            className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
                        >
                            <option value="all">All Ratings</option>
                            <option value="8">8.0+ Stars</option>
                            <option value="7">7.0+ Stars</option>
                            <option value="6">6.0+ Stars</option>
                            <option value="5">5.0+ Stars</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${viewMode === "grid"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-accent"
                                }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${viewMode === "list"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-accent"
                                }`}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            {searchTerm && (
                <div className="mb-6">
                    <p className="text-muted-foreground" style={{ fontFamily: "Open Sans, sans-serif" }}>
                        {filteredAndSortedMovies.length} result{filteredAndSortedMovies.length !== 1 ? "s" : ""} for "{searchTerm}"
                    </p>
                </div>
            )}

            {/* Movies Grid/List */}
            {filteredAndSortedMovies.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">No movies match your filters</p>
                    <button
                        onClick={() => {
                            setSearchTerm("")
                            setFilterByRating("all")
                        }}
                        className="text-primary hover:text-secondary transition-colors duration-200"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div
                    className={`grid gap-6 ${viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                        : "grid-cols-1"
                        }`}
                >
                    {filteredAndSortedMovies.map((movie: IMovie) => (
                        <div
                            key={movie.id}
                            className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${viewMode === "list" ? "flex gap-4 bg-card p-4 rounded-lg border border-border hover:border-accent" : ""
                                }`}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            {/* Movie Poster */}
                            <div
                                className={`relative overflow-hidden rounded-lg ${viewMode === "list" ? "w-24 h-36 flex-shrink-0" : "aspect-[2/3]"
                                    }`}
                            >
                                <img
                                    src={getImageSrc(movie) || "/placeholder.svg"}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://via.placeholder.com/300x450/374151/9CA3AF?text=${encodeURIComponent(movie.title)}`
                                    }}
                                />

                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-white text-xs font-medium">{formatRating(movie.vote_average)}</span>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={(e) => handleRemoveFromWishlist(movie, e)}
                                    className="absolute z-20 top-2 left-2 w-8 h-8 bg-destructive/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity duration-200 hover:bg-destructive cursor-pointer"
                                >
                                    <svg className="w-4 h-4 text-destructive-foreground" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </button>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Movie Info */}
                            < div className={`${viewMode === "list" ? "flex-1" : "mt-3"}`}>
                                <h3
                                    className={`font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 ${viewMode === "list" ? "text-lg mb-2" : "text-sm mb-1"
                                        }`}
                                    style={{ fontFamily: "Open Sans, sans-serif" }}
                                >
                                    {movie.title}
                                </h3>

                                <div
                                    className={`flex items-center gap-2 text-muted-foreground ${viewMode === "list" ? "text-base" : "text-xs"
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                    </svg>
                                    <span>{getYear(movie.release_date)}</span>
                                </div>

                                {viewMode === "list" && movie.overview && (
                                    <p
                                        className="text-muted-foreground text-sm mt-2 line-clamp-2"
                                        style={{ fontFamily: "Open Sans, sans-serif" }}
                                    >
                                        {movie.overview}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div >
            )}
        </div >
    )
}

export default EnhancedSaved
