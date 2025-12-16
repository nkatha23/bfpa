import { Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Finally, a Bitcoin course that speaks our language — business, governance, and real-world use.",
    name: "Sarah M.",
    role: "Finance Manager, Kenya",
  },
  {
    quote: "This Academy helped our NGO receive global donations transparently and efficiently.",
    name: "David O.",
    role: "Humanitarian Lead, Nigeria",
  },
  {
    quote: "My students now understand Bitcoin as technology, not just speculation.",
    name: "Prof. Amina K.",
    role: "University Lecturer, Ghana",
  },
]

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Professionals Are <span className="text-primary">Saying</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
