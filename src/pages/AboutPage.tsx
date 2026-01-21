import { Leaf, Heart, Users, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-flour.jpg';

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We partner with farms that prioritize sustainable and organic practices.',
    },
    {
      icon: Heart,
      title: 'Quality First',
      description: 'Every product is carefully selected and tested for premium quality.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We support local farming communities and fair trade practices.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the finest products to your table.',
    },
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Started with a passion for quality ingredients' },
    { year: '2017', title: 'Expansion', description: 'Launched our flour product line' },
    { year: '2020', title: 'Nationwide', description: 'Expanded to serve customers across the country' },
    { year: '2024', title: '100K+ Customers', description: 'Proudly serving over 100,000 happy customers' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Story
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Bringing nature's finest ingredients from farm to table since 2015
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Nature's Pantry, we believe that everyone deserves access to the finest quality 
              ingredients. We work directly with farmers who share our commitment to sustainable 
              agriculture, ensuring that every cashew and every grain of flour meets our exacting 
              standards. Our mission is simple: to bring you nature's best, with complete 
              transparency about where it comes from and how it's made.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-background border-border/50 text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1" />
                  <div className="pl-12 md:pl-0 md:w-1/2">
                    <Card className="bg-card">
                      <CardContent className="p-6">
                        <span className="text-sm font-bold text-primary">{milestone.year}</span>
                        <h3 className="font-serif text-lg font-semibold text-foreground mt-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              Our Quality Promise
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Lab-tested for purity',
                'No artificial additives',
                'Freshness guaranteed',
                'Sustainable packaging',
                'Direct farm sourcing',
                'Fair trade certified',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center sm:justify-start">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
