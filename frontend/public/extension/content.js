(function detectAccommodation() {
  const empty = { name: null, location: null, price: null, currency: null, checkIn: null, checkOut: null, guests: null };
  const result = { ...empty };

  const clean = (value) => typeof value === 'string' && value.trim() ? value.trim().replace(/\s+/g, ' ') : null;
  const meta = (name) => clean(document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.content);
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((script) => {
    try {
      const parsed = JSON.parse(script.textContent);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  });
  const lodging = jsonLd.find((item) => ['Hotel', 'LodgingBusiness', 'VacationRental'].includes(item?.['@type']));
  const heading = document.querySelector('h1')?.textContent;
  const priceText = `${document.querySelector('meta[itemprop="price"]')?.content || ''} ${document.body?.innerText?.slice(0, 3000) || ''}`;
  const priceMatch = priceText.match(/(?:₹|INR|\$|USD|€|EUR|£|GBP)\s*[\d,]+(?:\.\d{1,2})?/i);

  result.name = clean(lodging?.name) || clean(meta('og:title')) || clean(heading) || clean(document.title);
  result.location = clean(lodging?.address?.addressLocality) || clean(meta('geo.placename'));
  result.price = priceMatch ? Number(priceMatch[0].replace(/[^\d.]/g, '').replace(/,(?=\d{3})/g, '')) : null;
  result.currency = priceMatch?.[0].match(/₹|INR|\$|USD|€|EUR|£|GBP/i)?.[0] || clean(document.querySelector('meta[itemprop="priceCurrency"]')?.content);

  if (result.name || result.location || result.price) {
    chrome.runtime.sendMessage({ type: 'HOTEL_DETECTED', payload: result }).catch(() => {});
  }
})();