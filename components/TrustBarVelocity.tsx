"use client"

import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"
import { metrics } from "@/constants"

export default function TrustBarVelocity() {
  return (
    <section
      className="w-full pt-8 animate-in fade-in fill-mode-both overflow-hidden"
      style={{ animationDelay: '1.4s' }}
      aria-label="Platform statistics and achievements"
    >
      {/* Scroll velocity container con dos filas */}
      <ScrollVelocityContainer className="text-sm md:text-base font-medium">

        {/* Primera fila - dirección derecha */}
        <ScrollVelocityRow baseVelocity={5} direction={1}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={`row1-${metric.value}-${index}`}
                className="inline-flex items-center gap-3 mx-4 px-4 py-2.5 rounded-xl bg-background/80 backdrop-blur-sm border border-border/40 hover:border-border/80 transition-all duration-300 group"
              >
                {/* Ícono con gradient */}
                <div className="relative">
                    <div
                    className="absolute inset-0 rounded-lg blur-sm transition-opacity group-hover:opacity-30"
                    style={{ backgroundColor: metric.color, opacity: 0.2 }}
                  />
                  <div
                    className="relative p-2 rounded-lg"
                    style={{ backgroundColor: `${metric.color}20` }} // opacity
                  >
                    <Icon
                      className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Texto */}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-foreground/90 tabular-nums group-hover:text-foreground transition-colors">
                    {metric.value}
                  </span>
                </div>
              </div>
            )
          })}
        </ScrollVelocityRow>

        {/* Segunda fila - dirección izquierda (para efecto cruzado) */}
        <ScrollVelocityRow baseVelocity={5} direction={-1}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={`row2-${metric.value}-${index}`}
                className="inline-flex items-center gap-3 mx-4 px-4 py-2.5 rounded-xl bg-background/80 backdrop-blur-sm border border-border/40 hover:border-border/80 transition-all duration-300 group"
              >
                {/* Ícono con gradient */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-lg blur-sm transition-opacity group-hover:opacity-30"
                    style={{ backgroundColor: metric.color, opacity: 0.2 }}
                  />
                  <div
                    className="relative p-2 rounded-lg"
                    style={{ backgroundColor: `${metric.color}20` }} // opacity
                  >
                    <Icon
                      className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Texto */}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-foreground/90 tabular-nums group-hover:text-foreground transition-colors">
                    {metric.value}
                  </span>
                </div>
              </div>
            )
          })}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  )
}