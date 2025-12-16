import { Check } from "lucide-react"

const points = [
  "Practical, job-relevant Bitcoin skills",
  "Industry-specific learning tracks",
  "Real-world case studies from Africa",
  "Community of forward-thinking professionals",
]

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Bitcoin Education for <span className="text-primary">Real-World Impact</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Most professionals don't understand Bitcoin beyond speculation. We're changing that by providing
              industry-specific education that empowers African professionals to leverage Bitcoin in their careers.
            </p>

            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border">
              <img
                src="/african-cityscape-with-digital-overlay--modern-tec.jpg"
                alt="African innovation and technology"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-2xl blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
