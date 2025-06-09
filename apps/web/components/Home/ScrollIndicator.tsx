"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollIndicator(){
    return (
        <>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="
        flex
        items-center
        justify-center
        
        fixed
        bottom-8
        right-8
        w-12 h-12
        rounded-full
        
        bg-white/10

        border
        border-white/20
        
        backdrop-blur-sm
        "
        >
            <motion.div className="
            w-8 h-8
            rounded-full
            
            bg-gradient-to-r
            from-purple-500 
            to-pink-500"
            
            style={{
                scaleY: useScroll().scrollYProgress
            }}>
                
            </motion.div>

        </motion.div>
        </>
    )
}