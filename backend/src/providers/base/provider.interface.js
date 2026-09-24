class ProviderInterface {
  constructor(name) {
    this.name = name;
  }

  async search() {
    throw new Error(`${this.name} provider does not implement search`);
  }
}

function normalizeResult(result) {
  return {
    provider: result.provider || null,
    hotelId: result.hotelId || null,
    hotelName: result.hotelName || null,
    location: result.location || { city: null, country: null },
    price: {
      amount: result.price?.amount ?? null,
      currency: result.price?.currency || null,
      taxes: result.price?.taxes ?? null,
      fees: result.price?.fees ?? null,
      total: result.price?.total ?? null
    },
    rating: result.rating ?? null,
    reviewCount: result.reviewCount ?? null,
    roomName: result.roomName || null,
    cancellationPolicy: result.cancellationPolicy ?? null,
    available: result.available ?? null,
    bookingUrl: result.bookingUrl ?? null,
    fetchedAt: result.fetchedAt || new Date().toISOString()
  };
}

module.exports = { ProviderInterface, normalizeResult };
