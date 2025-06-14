import { useCredits } from "@/hooks/use-credits"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Loader2, Plus } from "lucide-react"

export function Credits(){

    const  { credits, loading } = useCredits()
    const router = useRouter()

    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="ghost"
                    size="sm"
                    className="
                    flex
                    items-center
                    gap-2
                    h-9
                    px-4 py-2">
                        {loading ? (
                            <Loader2 className="
                            h-4 w-4
                            animate-spin"
                            />
                        ) : (
                            <>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            >
                                <circle cx="12" cy="12" r="8" />
                                <path d="M12 8v8" />
                                <path d="M8 12h8" />
                            </svg>

                            <span className="
                            font-medium
                            ">
                                {credits?.toLocaleString() ?? 0} Credits
                            </span>
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                    className="
                    flex
                    items-center
                    jusitfy-between
                    cursor-pointer"
                    
                    onClick={() => router.push("/pricing")}>
                        <span>
                            Add Credits
                        </span>
                        <Plus className="
                        h-4 w-4"></Plus>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}