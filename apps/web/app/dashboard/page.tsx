import { auth } from "@clerk/nextjs/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "@/components/Camera";
import { GenerateImage } from "@/components/GenrateImage";
import { Packs } from "@/components/Packs";
import { Train } from "@/components/Train";

export default async function DashboardPage(){
    const  { userId } = await auth()

    // if(!userId) return
    
    return (
        <>
        <div className="
        max-w-6xl 
        mx-auto
        px-4
        py-24
        min-h-screen">
            <div className="
            space-y-8">
                <Tabs defaultValue="camera">
                    <TabsList className="
                    h-10
                    p-1
                    rounded-lg
                    
                    inline-flex
                    items-center
                    justify-start

                    bg-pink-50
                    dark:bg-muted/50
                    ">
                        <TabsTrigger
                        value="camera"
                        className="
                        data-[state=active]:bg-pink-500/70
                        backdrop-blur-sm
                        data-[state=active]:text-pink-50
                        cursor-pointer
                        px-3
                        py-1.5">
                            Camera
                        </TabsTrigger>

                        <TabsTrigger
                        value="generate"
                        className="
                        px-3 
                        py-1.5
                        cursor-pointer
                        data-[state=active]:bg-pink-500/70
                        data-[state=active]:text-pink-50
                        backdrop-blur-sm">
                            Generate
                            <span className="
                            hidden
                            md:block  
                            pl-1">
                                Images
                            </span>
                        </TabsTrigger>

                        <TabsTrigger
                        value="packs"
                        className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
                        >
                        Packs
                        </TabsTrigger>
                        <TabsTrigger
                        value="train"
                        className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
                        >
                        Train<span className="md:block hidden pl-1">Model</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="
                    mt-8
                    bg-card
                    rounded-lg
                    dark:bg-black/70
                    ">
                        <TabsContent
                        value="camera"
                        className="
                        mt-0
                        focus-visible:outline-none
                        ">
                            <Camera /> 
                        </TabsContent>

                        <TabsContent
                        value="generate"
                        className="
                        mt-8
                        bg-card
                        rounded-lg
                        ">
                            <GenerateImage />
                        </TabsContent>

                        <TabsContent
                        value="packs"
                        className="
                        mt-8
                        bg-card
                        rounded-lg">
                            <Packs />
                        </TabsContent>

                        <TabsContent
                        value="train"
                        className="
                        bg-card
                        rounded-lg">
                            <Train />
                        </TabsContent>

                    </div>
                </Tabs>
            </div>
        </div>
        </>
    )
}