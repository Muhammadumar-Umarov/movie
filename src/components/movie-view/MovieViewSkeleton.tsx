import { Skeleton } from "antd"

interface MovieViewSkeletonProps {
  count?: number
}

const MovieViewSkeleton = ({ count = 12 }: MovieViewSkeletonProps) => {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
              <Skeleton.Image
                active
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                }}
              />
            </div>

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
        ))}
      </div>
    </div>
  )
}

export default MovieViewSkeleton
