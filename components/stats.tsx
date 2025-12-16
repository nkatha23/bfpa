import { Users, BookOpen, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Professionals Trained",
  },
  {
    icon: BookOpen,
    value: "3 Tracks",
    label: "Industry-Tailored Programs",
  },
  {
    icon: Globe,
    value: "10+",
    label: "Countries Reached",
  },
]

export function Stats() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="bg-card border-border p-8 text-center hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
