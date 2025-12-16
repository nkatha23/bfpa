import { Card } from "@/components/ui/card"

const partners = [
  { name: "Tando", logo: "/tando-logo-minimal.jpg" },
  { name: "Bitnob", logo: "/bitnob-logo-minimal.jpg" },
  { name: "Machankura", logo: "/machankura-logo-minimal.jpg" },
  { name: "M-Pesa", logo: "/m-pesa-logo-minimal.jpg" },
  { name: "African University Network", logo: "/university-logo-minimal.jpg" },
  { name: "Fintech Africa", logo: "/fintech-logo-minimal.jpg" },
]

export function Partnerships() {
  return (
    <section id="community" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground">Building the Bitcoin ecosystem together</p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <Card
              key={partner.name}
              className="bg-card border-border p-6 flex items-center justify-center hover:border-primary/30 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
