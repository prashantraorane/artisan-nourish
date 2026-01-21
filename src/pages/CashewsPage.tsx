import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCashewTypes } from '@/lib/products';
import heroImage from '@/assets/hero-cashews.jpg';
import productCashewsRaw from '@/assets/product-cashews-raw.jpg';
import productCashewsRoasted from '@/assets/product-cashews-roasted.jpg';

const productImages: Record<string, string> = {
  'cashew-raw-250': productCashewsRaw,
  'cashew-roasted-250': productCashewsRoasted,
};

const CashewsPage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  
  const types = getCashewTypes();
  const allProducts = getProductsByCategory('cashews').map(p => ({
    ...p,
    image: productImages[p.id] || p.image
  }));

  const filteredProducts = selectedTypes.length > 0
    ? allProducts.filter((p) => selectedTypes.includes(p.type))
    : allProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Type</h3>
        <div className="space-y-3">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <span className="text-sm text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </div>
      {selectedTypes.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedTypes([])}
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Cashews" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Premium Cashews
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Discover our selection of hand-picked, premium quality cashews in various flavors and sizes
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-lg border border-border">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{sortedProducts.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] bg-background">
                    <SheetHeader>
                      <SheetTitle className="font-serif">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products match your filters</p>
                <Button variant="link" onClick={() => setSelectedTypes([])}>
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CashewsPage;
