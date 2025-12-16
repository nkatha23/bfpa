import { UserPlus, BookOpen, Lightbulb, Award } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Enroll",
    description: "Choose your professional track",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Engage with short, interactive modules",
  },
  {
    icon: Lightbulb,
    title: "Apply",
    description: "Build real-world capstone projects",
  },
  {
    icon: Award,
    title: "Certify",
    description: "Earn your certificate and join alumni",
  },
]

export function Timeline() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Learning <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A structured path from enrollment to certification</p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex items-center gap-8 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center flex-shrink-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150 + 50}ms` }}
                >
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
