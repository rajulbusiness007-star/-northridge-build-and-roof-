import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ThumbsUp, 
  Search, 
  X, 
  Filter, 
  MessageSquarePlus, 
  Award, 
  Building2, 
  Home, 
  Wrench, 
  ArrowRight, 
  Phone,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';
import { verifiedReviewsData, reviewsSummary, ReviewItem } from '../../data/reviewsData';
import { TrustBadges } from '../common/TrustBadges';

interface ReviewsPageProps {
  business: BusinessConfig;
  onBookInspection: () => void;
  onRequestQuote: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  business,
  onBookInspection,
  onRequestQuote,
}) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(verifiedReviewsData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest'>('helpful');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  
  // Submit Review Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formService, setFormService] = useState('Class 4 Impact Shingle Replacement');
  const [formHeadline, setFormHeadline] = useState('');
  const [formContent, setFormContent] = useState('');

  // Real-time filtering
  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return reviewsList
      .filter((rev) => {
        // Category filter
        if (categoryFilter !== 'all' && rev.serviceCategory !== categoryFilter) {
          return false;
        }
        // Star filter
        if (starFilter !== 'all' && rev.rating !== starFilter) {
          return false;
        }
        // Text search
        if (!q) return true;

        const authorMatch = rev.author.toLowerCase().includes(q);
        const locationMatch = rev.location.toLowerCase().includes(q);
        const headlineMatch = rev.headline.toLowerCase().includes(q);
        const contentMatch = rev.content.toLowerCase().includes(q);
        const serviceMatch = rev.service.toLowerCase().includes(q);
        const platformMatch = rev.platform.toLowerCase().includes(q);

        return authorMatch || locationMatch || headlineMatch || contentMatch || serviceMatch || platformMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return (b.helpfulCount + (helpfulVoted[b.id] ? 1 : 0)) - (a.helpfulCount + (helpfulVoted[a.id] ? 1 : 0));
        }
        if (sortBy === 'highest') {
          return b.rating - a.rating;
        }
        return b.id.localeCompare(a.id);
      });
  }, [reviewsList, searchQuery, categoryFilter, starFilter, sortBy, helpfulVoted]);

  const handleHelpfulClick = (id: string) => {
    setHelpfulVoted((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formContent.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim(),
      location: formLocation.trim() || 'Dallas-Fort Worth, TX',
      service: formService,
      serviceCategory: 'residential',
      rating: formRating,
      date: 'Just now',
      headline: formHeadline.trim() || 'Excellent Roofing Craftsmanship',
      content: formContent.trim(),
      verified: true,
      platform: 'Google Reviews',
      helpfulCount: 0,
      recommended: true
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setModalOpen(false);
      // Reset form
      setFormAuthor('');
      setFormLocation('');
      setFormHeadline('');
      setFormContent('');
      setFormRating(5);
    }, 1800);
  };

  // Schema.org AggregateRating & Review Structured Data
  const reviewsSchemaJson = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      telephone: business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: 'US'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewsSummary.averageRating.toString(),
        bestRating: '5',
        worstRating: '1',
        ratingCount: reviewsSummary.totalReviews.toString()
      },
      review: reviewsList.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: r.author
        },
        datePublished: '2026-10-15',
        reviewBody: r.content,
        name: r.headline,
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          ratingValue: r.rating.toString(),
          worstRating: '1'
        }
      }))
    };
  }, [business, reviewsList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Schema.org Review & AggregateRating JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchemaJson) }}
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Verified Customer Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Client Reviews &amp; Testimonials
          </h1>
          <p className="text-base text-slate-600 leading-relaxed pt-1">
            Read unfiltered feedback from homeowners and facility directors across the Dallas-Fort Worth Metroplex. Every review represents code-exceeding workmanship and transparent service.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="shrink-0 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4 text-orange-400" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Aggregate Rating & Verification Cards Bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Score & Star Breakdown */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-slate-900 font-mono tracking-tight">
                {reviewsSummary.averageRating}
              </span>
              <div>
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Based on {reviewsSummary.totalReviews} verified client ratings
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
              {reviewsSummary.breakdown.map((b) => (
                <div key={b.stars} className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="w-12 font-mono font-medium shrink-0 flex items-center gap-1">
                    <span>{b.stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-slate-400 text-[11px] shrink-0">
                    {b.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{reviewsSummary.recommendationPercentage}% Recommended</span>
            </span>
            <span className="text-slate-400">100% Real Clients</span>
          </div>
        </div>

        {/* Card 2: 3-Pillar Verification Platforms */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                G
              </div>
              <div className="font-bold text-sm text-slate-900">Google Reviews</div>
              <div className="text-2xl font-black text-slate-900 font-mono">4.9 ★</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                96 certified 5-star homeowner reviews across DFW.
              </p>
            </div>
            <div className="text-[11px] font-mono font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Google Verified</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">GAF Master Elite®</div>
              <div className="text-2xl font-black text-slate-900 font-mono">5.0 ★</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Top 2% North American contractor quality audit.
              </p>
            </div>
            <div className="text-[11px] font-mono font-semibold text-orange-600 pt-3 border-t border-slate-100 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Manufacturer Audited</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">BBB Accredited</div>
              <div className="text-2xl font-black text-slate-900 font-mono">A+</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero unresolved consumer or commercial disputes.
              </p>
            </div>
            <div className="text-[11px] font-mono font-semibold text-emerald-600 pt-3 border-t border-slate-100 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>A+ Integrity Grade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Search & Multi-Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="reviews-search-input" className="sr-only">
              Search reviews by keyword, location, or service
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="reviews-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews (e.g. hail, clean yard, Frisco, adjuster, metal, TPO)..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              <option value="helpful">Most Helpful Votes</option>
              <option value="highest">Highest Rating (5★)</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Category & Star Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential Shingle' },
              { id: 'metal', label: 'Standing Seam Metal' },
              { id: 'commercial', label: 'Commercial Flat TPO' },
              { id: 'emergency', label: 'Storm & Leak Tarping' },
              { id: 'inspection', label: 'Drone Audits' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Showing {filteredReviews.length} of {reviewsList.length} reviews</span>
            {(searchQuery || categoryFilter !== 'all' || starFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setStarFilter('all');
                }}
                className="text-orange-600 hover:text-orange-700 font-semibold underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              No reviews match "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms or select "All Projects" to view complete feedback.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStarFilter('all');
            }}
            className="px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-lg hover:bg-orange-500 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const hasVoted = Boolean(helpfulVoted[rev.id]);
            const currentHelpful = rev.helpfulCount + (hasVoted ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Stars + Platform */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {rev.platform}
                    </span>
                  </div>

                  {/* Headline & Body */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      "{rev.headline}"
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-6">
                      {rev.content}
                    </p>
                  </div>

                  {/* Project Specs Pill if present */}
                  {rev.projectSpecs && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-mono">
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
                        Scope &amp; Materials:
                      </span>
                      {rev.projectSpecs}
                    </div>
                  )}
                </div>

                {/* Footer: Author, Location, Date & Helpful vote */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="Verified Client">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {rev.location} · {rev.service}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {rev.date}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                      hasVoted
                        ? 'bg-orange-50 text-orange-700 border border-orange-200 font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title="Mark review as helpful"
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-orange-600 text-orange-600' : ''}`} />
                    <span>{currentHelpful}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Verified Certifications & Industry Trust Badges */}
      <TrustBadges business={business} className="mt-8" />

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5 animate-in fade-in duration-150">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                Share Your Experience
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Write a Verified Client Review
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your feedback helps Dallas-Fort Worth homeowners choose safe, certified roofing contractors.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-sm text-emerald-900">
                  Thank You for Your Review!
                </h3>
                <p className="text-xs text-emerald-700">
                  Your feedback has been verified and added to our client showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Overall Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormRating(s)}
                        className="cursor-pointer p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            s <= formRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-500 font-mono ml-2">
                      {formRating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="e.g. Michael Harrison"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City &amp; State
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Frisco, TX"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Roofing Service Completed
                  </label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="Class 4 Impact Shingle Replacement">Class 4 Impact Shingle Replacement</option>
                    <option value="Standing Seam Metal Roof Installation">Standing Seam Metal Roof Installation</option>
                    <option value="Emergency Storm Leak Repair & Tarping">Emergency Storm Leak Repair &amp; Tarping</option>
                    <option value="Commercial Flat TPO Membrane">Commercial Flat TPO Membrane</option>
                    <option value="21-Point Drone Roof Inspection">21-Point Drone Roof Inspection</option>
                    <option value="Seamless Gutters & Leaf Protection">Seamless Gutters &amp; Leaf Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={formHeadline}
                    onChange={(e) => setFormHeadline(e.target.value)}
                    placeholder="e.g. Fast response and great cleanup!"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Review *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Describe the punctuality, communication, roofing craftsmanship, and clean-up..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Publish Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Conversion Section */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 text-center space-y-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
            Join Over 148+ Satisfied Texas Property Owners
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Schedule Your Free On-Site Roof Inspection Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our Haag-certified inspectors assess your entire roof deck with drone photography and attic thermal moisture checks with zero cost and zero obligation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRequestQuote}
              className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Free Roofing Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBookInspection}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book 21-Point Drone Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
