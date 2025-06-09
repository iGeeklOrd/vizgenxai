"use client"

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

export function HeroHeader() {
    const router = useRouter();

    return (
        <>
        <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
        className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
                <motion.span
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.2, duration: 0.5}}
                whileHover={{scale: 1.05}}
                className="flex items-center px-4 py-2 gap-2 rounded-full text-sm font-medium border bg-pink-600/10 text-pink-500 border-pink-700/20 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-600/20">
                    <Sparkles className="w-4 h-4"/>
                    Next-Gen AI Portrait Generation
                </motion.span>
                <motion.span
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.2, duration: .5}}
                whileHover={{scale: 1.05}}
                className="px-4 py-2 gap-2 rounded-full flex items-center text-sm font-medium border bg-pink-600/10 text-pink-500 border-700/20 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-600/20">
                    <Zap className="w-4 h-4"/>
                    Powred by Multimodels
                </motion.span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                Transform Your Photos With {" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    AI Magic
                </span>
            </h1>

            <div className="flex items-center justify-center gap-4 pt-4">
                <SignedOut>
                    <Button
                    asChild
                    className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <SignInButton>
                            <span className="flex items-center">
                                Start Creating Now
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
                            </span>
                        </SignInButton>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <Button onClick={() => {
                        router.push("/dashboard")
                    }}
                    className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Go To Dashboard
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </SignedIn>
            </div>
        </motion.div>
        </>
    )
}