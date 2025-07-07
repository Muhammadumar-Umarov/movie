import { Skeleton } from "antd"

const PersonSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" style={{ paddingTop: "70px" }}>
      {/* Navigation Bar Skeleton */}
      <div className="bg-gray-50 dark:bg-black py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Skeleton.Button
              active
              size="default"
              style={{
                width: "140px",
                height: "32px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <div className="flex gap-3">
              <Skeleton.Button
                active
                size="small"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton.Button
                active
                size="small"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Sidebar Skeleton */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6" style={{ top: "90px" }}>
              {/* Hero Section Skeleton - Moved to Sidebar */}
              <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: "#161616" }}>
                {/* Profile Image Skeleton */}
                <div className="relative mb-6">
                  <Skeleton.Image
                    active
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "16px",
                    }}
                  />
                </div>

                {/* Person Info Skeleton */}
                <div className="text-center space-y-4">
                  {/* Tag Skeleton */}
                  <Skeleton.Button
                    active
                    size="small"
                    style={{
                      width: "80px",
                      height: "24px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  {/* Name Skeleton */}
                  <Skeleton.Input
                    active
                    size="large"
                    style={{
                      width: "200px",
                      height: "32px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  {/* Info Lines Skeleton */}
                  <div className="space-y-3">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: "180px",
                        height: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: "160px",
                        height: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: "140px",
                        height: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    />
                  </div>

                  {/* Career Stats Skeleton */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="text-center space-y-2">
                        <Skeleton.Input
                          active
                          size="small"
                          style={{
                            width: "40px",
                            height: "24px",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                        <Skeleton.Input
                          active
                          size="small"
                          style={{
                            width: "50px",
                            height: "16px",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Details Skeleton */}
              <div className="rounded-2xl p-6 shadow-lg bg-gray-50 dark:bg-[#161616]">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton.Avatar
                    size="small"
                    active
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Skeleton.Input
                    active
                    size="default"
                    style={{
                      width: "120px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{
                          width: "80px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{
                          width: "100px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links Skeleton */}
              <div className="rounded-2xl p-6 shadow-lg bg-gray-50 dark:bg-[#161616]">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton.Avatar
                    size="small"
                    active
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Skeleton.Input
                    active
                    size="default"
                    style={{
                      width: "100px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Skeleton.Button
                    active
                    block
                    style={{
                      height: "32px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Skeleton.Button
                    active
                    block
                    style={{
                      height: "32px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="xl:col-span-3 space-y-8">
            {/* Biography Skeleton */}
            <div className="rounded-2xl p-8 shadow-lg bg-gray-50 dark:bg-[#161616]">
              <Skeleton.Input
                active
                size="large"
                style={{
                  width: "150px",
                  height: "32px",
                  marginBottom: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton
                active
                paragraph={{ rows: 8 }}
                title={false}
                style={{
                  color: "white",
                }}
              />
            </div>

            {/* Movies Skeleton */}
            <div className="rounded-2xl p-8 shadow-lg bg-gray-50 dark:bg-[#161616]">
              <div className="flex items-center gap-2 mb-8">
                <Skeleton.Input
                  active
                  size="large"
                  style={{
                    width: "120px",
                    height: "32px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <Skeleton.Avatar
                  size="small"
                  active
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "12px",
                      }}
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton.Avatar
                          size="small"
                          active
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            width: "16px",
                            height: "16px",
                          }}
                        />
                        <Skeleton.Input
                          size="small"
                          active
                          style={{
                            width: "40px",
                            height: "16px",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      </div>
                      <Skeleton.Input
                        active
                        style={{
                          width: "100%",
                          height: "20px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <Skeleton.Input
                        size="small"
                        active
                        style={{
                          width: "60px",
                          height: "14px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonSkeleton
