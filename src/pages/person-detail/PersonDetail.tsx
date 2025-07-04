import { usePerson } from '@/api/hooks/usePerson';
import MovieView from '@/components/movie-view/MovieView';
import { IMAGE_URL } from '@/const';
import { ArrowLeftOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PersonDetail = () => {
    const { id } = useParams()
    const { getPersonSingle, getPersonMovie} = usePerson()
    const {data: getCreditsData} = getPersonMovie(id || "", "credits" )

    // console.log(getCreditsData);
    
    const { data } = getPersonSingle(id || "")
    console.log(data);
    const age = data?.birthday ? new Date().getFullYear() - new Date(data?.birthday).getFullYear() : null
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        className="border-red-700 text-red-700 hover:bg-red-50 dark:hover:bg-red-950  bg-transparent"
                        style={{background:"black", color: "white", border: "red"}}
                    >
                        <Link to={"/movies"}>
                            <ArrowLeftOutlined className="mr-2" />
                            Back to Movies
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#161616] rounded-lg shadow-lg p-6 sticky top-8">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
                                <img src={IMAGE_URL + data?.profile_path || "/placeholder.svg"} alt={data?.name} className="object-cover" />
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{data?.name}</h1>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <CalendarOutlined className="mr-2" />
                                    <div>
                                        <div>{new Date(data?.birthday).toLocaleDateString()}</div>
                                        {age && <div className="text-xs">({age} years old)</div>}
                                    </div>
                                </div>

                                <div className="flex items-start text-gray-600 dark:text-gray-400">
                                    <EnvironmentOutlined className="mr-2 mt-0.5 flex-shrink-0" />
                                    <div>{data?.place_of_birth}</div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-[#161616] rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Biography</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data?.biography}</p>
                        </div>
                    </div>
                </div>
                    <MovieView data={getCreditsData?.cast}/>
            </div>
        </div>
    )
}

export default React.memo(PersonDetail)