
## Scope

Three workstreams, shipped in order so each can be verified before the next.

### 1. UI/UX redesign (golden ratio · 60-30-10 · conversion-optimized)

- Keep all existing features, routes, and backend tables. Only refresh presentation.
- Tighten the design system in `src/index.css` + `tailwind.config.ts`:
  - 60% neutral surface, 30% teal/blue primary, 10% orange accent (already scaffolded — enforce it by removing hardcoded `bg-gray-*`, `text-white`, `bg-black` etc. in components and routing them through semantic tokens).
  - Golden-ratio spacing/typography scale already exists; apply it consistently in `Hero`, `Services`, `Membership`, `Testimonials`, `Footer`, `Header`.
- Rebuild key sections for clarity-in-5s and 3-click navigation:
  - `Hero`: single H1 with primary keyword, sub-headline, one primary CTA ("Book a Service"), one secondary CTA ("Talk to AI Assistant"), trust strip (4.9★, COD, Same-day).
  - `Header`: sticky, mobile drawer, cart + sign-in always reachable. Add jump-anchors: Services / Membership / Contact.
  - `Services`: responsive card grid (1 / 2 / 3 / 4 cols), category filter chips, "Add to cart" + price visible without scroll.
  - `Footer`: structured nav, NAP (name/address/phone), social, Share Feedback (already added), legal.
- Responsive QA on `sm` (375), `md` (768), `lg` (1024), `xl` (1440). Fix any horizontal-scroll, tap-target (<44px), and contrast issues.
- Safety/security polish: add Zod validation on `ContactForm`, `Checkout`, `MembershipRegistrationModal`, `PartnerRegistrationForm`; `rel="noopener noreferrer"` on all external links; no `dangerouslySetInnerHTML` with user data.

### 2. Generative AI features (via Lovable AI Gateway, model `google/gemini-3-flash-preview`)

a. **AI Chat Assistant** (floating, bottom-right, replacing the current WhatsApp-only FAB with a combined FAB group):
   - Edge function `supabase/functions/ai-assistant/index.ts` using AI SDK `streamText` against Lovable AI Gateway.
   - System prompt is FabGuard-aware: knows services, pricing, COD, coverage, business hours, and can guide the user to book.
   - One conversation, no persistence (localStorage only for current session). Rendered with `react-markdown`.
   - Tools the model can call: `list_services`, `recommend_services({problem})`, `add_to_cart({serviceId})` — `add_to_cart` posts a `window` event the cart hook listens to.

b. **Smart Service Recommender** (inside Services section, "Describe your problem" input):
   - Calls the same edge function with a `mode: "recommend"` flag, returns ranked service IDs + reasoning.
   - Result renders as highlighted cards with one-click "Add all to cart".

c. **AI-generated SEO content** (build-time, not runtime):
   - Use the `ai-gateway` skill script to generate:
     - FAQ block (10 Q&A) targeting India home-service intent keywords.
     - Service descriptions enriched with location/intent keywords.
     - Hero/meta copy variants.
   - Output committed to `src/data/seo-content.ts` and rendered in a new `<FAQ />` section with `FAQPage` JSON-LD.

### 3. SEO growth (technical + content)

- Add `react-helmet-async`; per-route `<title>`, `<meta description>`, canonical, `og:*`, `twitter:*` for `/`, `/orders`, `/dashboard`, `/auth`, `/terms-and-conditions`.
- JSON-LD: `LocalBusiness` (sitewide in `index.html`), `Service` (per service, on Services section), `FAQPage` (FAQ section), `BreadcrumbList`.
- `public/sitemap.xml` via `scripts/generate-sitemap.ts` wired to `predev`/`prebuild`; lists only public routes.
- `public/robots.txt`: keep current allow-all, add `Sitemap: https://fabguard-services.lovable.app/sitemap.xml`.
- `public/llms.txt` describing FabGuard for AI crawlers.
- Image `alt` audit, `loading="lazy"` on below-the-fold images, single H1 per route, semantic landmarks.
- Keyword targets (high-intent India): "home services near me", "plumber near me", "electrician at home", "cleaning service India", "carpenter home visit", "laundry pickup service", "cash on delivery home service" — woven into H1/H2/meta, not stuffed.
- Trigger an SEO scan at the end.

### 4. Backend ↔ Frontend sync

- Audit `useServices`, `useMembershipsData`, `useCreateOrder`, `useOrderEmails`, `useOrderNotification`, `useContactForm` against the live schema (`services`, `memberships`, `orders`, `order_items`, `customers`, `contact_submissions`).
- Add React Query `staleTime`/`refetchOnWindowFocus` tuning, error toasts, and retry.
- Confirm `send-order-emails` is invoked on successful order and that admin recipients (`info@fabguard.co.in`, `fabguard.in@gmail.com`, `support@fabguard.co.in`) are in the function. Re-deploy.
- Verify RLS already supports the public order flow (current setup permits anonymous insert). No schema migration in this pass unless an issue is found during audit; if needed, surface it and request approval.

## Technical details

- New edge function: `supabase/functions/ai-assistant/index.ts` + shared provider helper `supabase/functions/_shared/ai-gateway.ts`. Requires `LOVABLE_API_KEY` (already set).
- Client AI components: `src/components/AIAssistant.tsx` (FAB + sheet), `src/components/ServiceRecommender.tsx`, `src/hooks/useAIAssistant.ts`.
- AI Elements install: `bunx ai-elements@latest add conversation message prompt-input shimmer tool`.
- SEO: install `react-helmet-async`, add `<HelmetProvider>` in `src/main.tsx`, per-page `<Helmet>` blocks.
- Build-time SEO content: run `python /tmp/lovable_ai.py` via the ai-gateway skill, write to `src/data/seo-content.ts`.
- Combine the existing WhatsApp FAB with the new AI FAB into a stacked group so we don't crowd mobile.

## What I will NOT touch unless you ask

- Database schema/migrations (audit only).
- Auth flow.
- Payment provider (stays COD).
- Existing order email function content/recipients (only re-verify).

## Deliverable checkpoints

1. Design refresh + responsive QA.
2. AI assistant + recommender working end-to-end.
3. SEO content + technical tags + sitemap, then SEO scan.
4. Backend sync audit report inline in chat.

Approve and I'll start with checkpoint 1.
