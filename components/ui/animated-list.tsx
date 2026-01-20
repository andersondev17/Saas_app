"use client"

import { AnimatePresence, motion, MotionProps } from "motion/react"
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"


export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { opacity: 0, y: 8, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  }

  return (
    <motion.tr {...animations} layout>
      {children}
    </motion.tr>
  )
}


export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as any).key}>
            {(item as any).props.children}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
