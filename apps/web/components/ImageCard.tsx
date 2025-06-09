import Image from "next/image";
import { TImage } from "./Camera";
import { ArrowDown } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface ImageCardProps extends TImage{
    onClick: () => void
}
export function ImageCard({ id, status, imageUrl, onClick ,prompt}: ImageCardProps ){
    if(!imageUrl) return

    return (
        <>
        <div onClick={onClick}
        className="
        group 
        relative
        rounded-none
        overflow-hidden
        max-w-[400px]
        cursor-zoom-in">
            <div className="
            flex
            gap-4
            min-h-32">
                <Image
                key={id}
                src={imageUrl}
                alt={status === "Generated" ? "Geenrated Image" : "Loading Image"}
                width={400}
                height={500}
                className="
                w-full
                "
                priority/>
            </div>
            <div className="
            absolute
            flex
            items-center
            justify-inbetween

            bottom-0
            left-0
            right-0
            p-4

            
            opacity-0
            goup-hover:opacity-100
            bg-opacity-70

            text-white 
            line-clamp-1 

            transition-normal
            duration-200
            ">
                <p>{prompt}</p>

                <span className="
                flex
                items-center
                jusitfy-between

                bg-primary-foreground
                text-muted-foreground

                rounded-md
                px-2 py-1
                ">
                    <ArrowDown />
                </span>
            </div>
        </div>
        </>
    )
}

export function ImageCardSkeleton() {
  return (
    <div className="
    rounded-none 
    mb-4 
    overflow-hidden 
    max-w-[400px] 
    cursor-pointer">
      <div className="
      flex 
      gap-4 
      min-h-32">
        <Skeleton className={`w-full h-[300px] rounded-none`} />
      </div>
    </div>
  );
}