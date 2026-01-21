import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import heroCashews from '@/assets/hero-cashews.jpg';
import heroFlour from '@/assets/hero-flour.jpg';
import productCashewsRaw from '@/assets/product-cashews-raw.jpg';
import productCashewsRoasted from '@/assets/product-cashews-roasted.jpg';
import productFlourAlmond from '@/assets/product-flour-almond.jpg';
import productFlourCoconut from '@/assets/product-flour-coconut.jpg';

const productImages: Record<string, string> = {
  'cashew-raw-250': productCashewsRaw,
  'cashew-roasted-250': productCashewsRoasted,
  'flour-almond-500': productFlourAlmond,
  'flour-coconut-500': productFlourCoconut,
};

const Index = () => {
  const featuredProducts = getFeaturedProducts().map(p => ({
    ...p,
    image: productImages[p.id] || p.image
  }));

  const features = [
    {
      icon: Leaf,
      title: 'Naturally Sourced',
      description: 'Premium ingredients from trusted organic farms',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On all orders over $50 nationwide',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: '100% satisfaction or your money back',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in quality',
    },
  ];

  const testimonials = [
    {
      quote: "The best cashews I've ever tasted. So fresh and flavorful!",
      author: 'Sarah M.',
      role: 'Home Chef',
    },
    {
      quote: "Their almond flour makes my gluten-free baking taste incredible.",
      author: 'James L.',
      role: 'Baker',
    },
    {
      quote: 'Outstanding quality and fast delivery. Highly recommend!',
      author: 'Emily R.',
      role: 'Health Enthusiast',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroCashews}
            alt="Premium Cashews"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6 animate-slide-up">
            <span className="inline-block text-secondary font-medium tracking-wider uppercase text-sm">
              Premium Quality Since 2015
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Nature's Finest{' '}
              <span className="text-gradient">Cashews & Flours</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover our handpicked selection of premium cashews and artisanal flours. 
              Sourced from the world's best farms, delivered fresh to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/cashews">
                <Button size="lg" className="gap-2 bg-gradient-hero hover:opacity-90 transition-opacity">
                  Shop Cashews
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/flours">
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/5">
                  Shop Flours
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-3 p-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Hand-selected favorites loved by our customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/cashews">
              <Button variant="outline" size="lg" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Explore our premium selection of cashews and flours
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/cashews" className="group">
              <Card className="overflow-hidden border-0 shadow-elevated">
                <div className="relative h-80">
                  <img
                    src={heroCashews}
                    alt="Premium Cashews"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <h3 className="font-serif text-2xl font-bold mb-2">Premium Cashews</h3>
                    <p className="text-primary-foreground/80 mb-4">
                      Raw, roasted, salted & flavored varieties
                    </p>
                    <span className="inline-flex items-center gap-2 font-medium text-accent group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="/flours" className="group">
              <Card className="overflow-hidden border-0 shadow-elevated">
                <div className="relative h-80">
                  <img
                    src={heroFlour}
                    alt="Artisanal Flours"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <h3 className="font-serif text-2xl font-bold mb-2">Artisanal Flours</h3>
                    <p className="text-primary-foreground/80 mb-4">
                      Almond, coconut, whole wheat & more
                    </p>
                    <span className="inline-flex items-center gap-2 font-medium text-accent group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-accent text-accent"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe for exclusive offers, recipes, and updates on new products
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="px-8"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
