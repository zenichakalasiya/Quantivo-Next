/**
 * Content constants.
 *
 * Copied verbatim from the <script data-dc-script> block of Quantivo.dc.html
 * (lines 1263-1379). Only additions are the `as const` / type exports below -
 * the data itself is unchanged, so copy edits stay a one-to-one diff against
 * the original.
 */

export const PAGES = ['home', 'about', 'services', 'work', 'blog', 'contact'] as const;

export const SERVICES = [
  { num: '01', title: 'Social Media Management', blurb: 'Build a consistent and engaging social presence that keeps your brand connected with the right audience.', tags: ['Strategy', 'Content Planning', 'Creative Content', 'Community Growth'] },
  { num: '02', title: 'SEO', blurb: 'Improve your visibility and help the right people discover your business through search.', tags: ['SEO Strategy', 'Keyword Research', 'On-Page SEO', 'Content Optimization'] },
  { num: '03', title: 'Google & Meta Ads Management', blurb: 'Reach the right audience with targeted campaigns designed to support awareness, leads, and business growth.', tags: ['Google Ads', 'Meta Ads', 'Campaign Strategy', 'Optimization'] },
  { num: '04', title: 'Branding & Identity', blurb: 'Build a brand that looks distinctive, communicates clearly, and stays memorable.', tags: ['Brand Strategy', 'Visual Identity', 'Logo Systems', 'Brand Guidelines'] },
  { num: '05', title: 'Packaging Design', blurb: 'Create packaging that protects your product, communicates your brand, and stands out on the shelf.', tags: ['Packaging Concepts', 'Product Packaging', 'Label Design', 'Visual Systems'] },
  { num: '06', title: 'Website Development', blurb: 'Build modern digital experiences that are designed around your brand, audience, and business goals.', tags: ['Business Websites', 'Landing Pages', 'Responsive Design', 'Digital Experiences'] },
  { num: '07', title: '3D Architectural Visualization', blurb: 'Bring architectural ideas and spaces to life before they are built.', tags: ['Architectural Renders', 'Interior Visualization', 'Exterior Visualization', 'Environments'] },
  { num: '08', title: '3D Product Visualization', blurb: 'Turn products into high-quality visual experiences that can be used for marketing, presentations, and digital campaigns.', tags: ['3D Modeling', 'Product Renders', 'Product Animation', 'Marketing Visualization'] },
];

export const DETAIL = [
  {
    id: 'svc-social', short: 'Social', num: '01 — Social Media Management', name: 'Social Media Management',
    head: 'Build a Stronger Social Presence.', cta: 'Explore Social Media Management',
    paras: [
      'Social media is more than simply posting content. A strong presence requires the right strategy, consistency, creativity, and understanding of your audience.',
      'We help businesses build and manage a professional social media presence that keeps their brand active, relevant, and connected with the right people.',
    ],
    groups: [{ name: '', items: ['Social Media Strategy', 'Content Planning', 'Content Calendar Creation', 'Social Media Post Design', 'Carousel Content', 'Reels & Short-Form Content', 'Content Creation', 'Caption Writing', 'Hashtag Research', 'Profile Optimization', 'Community Engagement Support', 'Performance Monitoring'] }],
  },
  {
    id: 'svc-seo', short: 'SEO', num: '02 — SEO', name: 'SEO',
    head: 'Get Found When Your Customers Are Searching.', cta: 'Explore SEO',
    paras: [
      'A great website needs to be discoverable. Our SEO services help improve your website\u2019s visibility in search engines and attract relevant organic traffic from people actively searching for your products or services.',
      'We focus on building a strong foundation for long-term search visibility.',
    ],
    groups: [{ name: '', items: ['SEO Strategy', 'Website SEO Audit', 'Keyword Research', 'Competitor Research', 'Search Intent Analysis', 'On-Page SEO', 'Technical SEO', 'Content Optimization', 'Meta Titles & Descriptions', 'Internal Linking Strategy', 'Website Structure Recommendations', 'SEO Performance Monitoring'] }],
  },
  {
    id: 'svc-ads', short: 'Ads', num: '03 — Google & Meta Ads Management', name: 'Google & Meta Ads Management',
    head: 'Reach the Right Audience at the Right Time.', cta: 'Explore Ads Management',
    paras: [
      'Paid advertising can help businesses reach potential customers faster when campaigns are built around the right strategy, targeting, messaging, and optimization.',
      'We manage Google and Meta advertising campaigns designed around your business objectives. Whether your goal is awareness, traffic, leads, or conversions, we create and manage campaigns with performance in mind.',
    ],
    groups: [
      { name: 'Google Ads', items: ['Search Campaigns', 'Display Campaigns', 'Performance Campaign Strategy', 'Keyword & Audience Targeting', 'Campaign Setup', 'Ad Copy Support', 'Campaign Optimization'] },
      { name: 'Meta Ads', items: ['Facebook Ads', 'Instagram Ads', 'Campaign Strategy', 'Audience Targeting', 'Retargeting Strategy', 'Ad Creative Direction', 'Campaign Optimization'] },
      { name: 'Campaign Management', items: ['Performance Monitoring', 'Budget Optimization', 'Testing & Improvement', 'Campaign Reporting'] },
    ],
  },
  {
    id: 'svc-brand', short: 'Branding', num: '04 — Branding & Identity', name: 'Branding & Identity',
    head: 'Build a Brand People Recognize.', cta: 'Explore Branding & Identity',
    paras: [
      'Your brand is more than a logo. It is how your business looks, communicates, and creates an impression in the minds of your audience.',
      'We help businesses create strong and consistent brand identities that communicate who they are and make them easier to recognize.',
    ],
    groups: [{ name: '', items: ['Brand Discovery', 'Brand Strategy Direction', 'Logo Design', 'Visual Identity', 'Color System', 'Typography Selection', 'Brand Elements & Assets', 'Brand Guidelines', 'Social Media Brand Direction', 'Marketing Collateral Direction'] }],
  },
  {
    id: 'svc-pack', short: 'Packaging', num: '05 — Packaging Design', name: 'Packaging Design',
    head: 'Design Packaging That Makes an Impact.', cta: 'Explore Packaging Design',
    paras: [
      'Packaging is an important part of how customers experience your product. Good packaging should communicate clearly, represent your brand, and create a strong visual presence.',
      'We create packaging designs that bring together brand identity, creativity, product information, and visual appeal.',
    ],
    groups: [{ name: '', items: ['Packaging Concept Development', 'Product Packaging Design', 'Label Design', 'Box Design', 'Pouch Design', 'Product Label Systems', 'Packaging Graphics', 'Brand Integration', 'Product Information Layout', 'Packaging Visual Direction', 'Packaging Mockups & Presentation'] }],
  },
  {
    id: 'svc-web', short: 'Web', num: '06 — Website Development', name: 'Website Development',
    head: 'Build a Digital Experience for Your Brand.', cta: 'Explore Website Development',
    paras: [
      'Your website is often one of the most important places where customers interact with your business.',
      'We develop modern, responsive, and professional websites designed around your brand, audience, and business goals. Our focus is on creating websites that are clear, functional, visually engaging, and easy to use.',
    ],
    groups: [{ name: '', items: ['Business Website Development', 'Corporate Websites', 'Landing Pages', 'Portfolio Websites', 'Responsive Website Development', 'UI Implementation', 'Front-End Development', 'Website Structure', 'Website Optimization', 'Basic SEO-Friendly Setup', 'Performance & Usability Considerations'] }],
  },
  {
    id: 'svc-arch', short: 'Arch Viz', num: '07 — 3D Architectural Visualization', name: '3D Architectural Visualization',
    head: 'See the Vision Before It Becomes Reality.', cta: 'Explore Architectural Visualization',
    paras: [
      'Architecture and spaces are easier to understand when people can see them. Our 3D architectural visualization services transform concepts, plans, and designs into detailed visual experiences that help communicate architectural ideas clearly.',
      'We create visuals for architects, designers, developers, real estate businesses, and other professionals who need to present spaces before they are built.',
    ],
    groups: [{ name: '', items: ['3D Architectural Modeling', 'Exterior Visualization', 'Interior Visualization', 'Architectural Rendering', 'Environment Visualization', 'Landscape Visualization', 'Realistic Materials & Lighting', 'Architectural Animation', 'Walkthrough Visualization', 'Presentation Visuals'] }],
  },
  {
    id: 'svc-prod', short: 'Product Viz', num: '08 — 3D Product Visualization', name: '3D Product Visualization',
    head: 'Bring Your Product to Life Before the Camera.', cta: 'Explore 3D Product Visualization',
    paras: [
      'High-quality 3D visualization gives businesses new ways to present their products. From realistic product renders to animations and marketing visuals, we help transform products into engaging visual experiences.',
      '3D visualization can be used for websites, advertising, social media, presentations, product launches, and other marketing materials.',
    ],
    groups: [{ name: '', items: ['3D Product Modeling', 'Product Rendering', 'Photorealistic Product Visualization', 'Product Animation', 'Product Exploded Views', 'Product Detail Visualization', '3D Marketing Visuals', 'Advertising Visuals', 'E-Commerce Product Visualization', 'Product Presentation Content', 'Custom Product Environments'] }],
  },
];

export const FAQS = [
  { num: '01', q: 'What services do you offer?', a: 'We offer Social Media Management, SEO, Google & Meta Ads Management, Branding & Identity, Packaging Design, Website Development, 3D Architectural Visualization, and 3D Product Visualization.' },
  { num: '02', q: 'How do you create a strategy for our business?', a: 'We first understand your business, goals, target audience, and market. Based on this, we create a customized strategy designed for your brand.' },
  { num: '03', q: 'How long does it take to see results?', a: 'The timeline depends on the service and your business goals. Some services, such as paid advertising, can show results quickly, while SEO and organic growth require more time.' },
  { num: '04', q: 'Can I choose multiple services for my business?', a: 'Yes. We can create a customized package by combining multiple services to provide a complete digital growth solution for your business.' },
];

export const APPROACH = [
  { num: '01 — Discover', title: 'Discover', body: 'We learn about your business, audience, goals, challenges, and opportunities.' },
  { num: '02 — Define', title: 'Define', body: 'We create a clear strategy and direction for the project.' },
  { num: '03 — Create', title: 'Create', body: 'We transform ideas into creative, digital, and visual solutions.' },
  { num: '04 — Deliver', title: 'Deliver', body: 'We bring everything together and prepare it for your audience and market.' },
  { num: '05 — Grow', title: 'Grow', body: 'For ongoing marketing projects, we analyze, optimize, and continuously improve.' },
];

export const WORK = [
  { title: 'Aurelia Skincare', year: '2025', disc: 'Brand identity, packaging system and product visualization for a clean-beauty launch.', tags: ['Branding', 'Packaging', '3D Product'], cat: 'Branding', ratio: '4/3', slot: 'qv-work-1', ph: 'Case study cover — Aurelia Skincare' },
  { title: 'Northline Residences', year: '2025', disc: 'Exterior and interior visualization suite for a residential development launch.', tags: ['3D Architectural', 'Environments'], cat: '3D', ratio: '4/3', slot: 'qv-work-2', ph: 'Case study cover — Northline Residences' },
  { title: 'Fold Studio', year: '2024', disc: 'Website design and front-end build for a design studio portfolio.', tags: ['Web', 'UI', 'Front-End'], cat: 'Web', ratio: '4/3', slot: 'qv-work-3', ph: 'Case study cover — Fold Studio' },
  { title: 'Verda Foods', year: '2024', disc: 'Always-on social content and paid campaign management for a retail food brand.', tags: ['Social', 'Meta Ads'], cat: 'Marketing', ratio: '4/3', slot: 'qv-work-4', ph: 'Case study cover — Verda Foods' },
  { title: 'Kite Financial', year: '2024', disc: 'Search visibility programme and content optimization for a fintech platform.', tags: ['SEO', 'Content'], cat: 'Marketing', ratio: '4/3', slot: 'qv-work-5', ph: 'Case study cover — Kite Financial' },
  { title: 'Mono Audio', year: '2023', disc: 'Product renders and animation for an e-commerce and campaign rollout.', tags: ['3D Product', 'Animation'], cat: '3D', ratio: '4/3', slot: 'qv-work-6', ph: 'Case study cover — Mono Audio' },
];

export const INTERESTS = ['Social Media', 'SEO', 'Google & Meta Ads', 'Branding', 'Packaging', 'Website', '3D Architectural', '3D Product'];

export type Service = (typeof SERVICES)[number];
export type ServiceDetail = (typeof DETAIL)[number];
export type Faq = (typeof FAQS)[number];
export type ApproachStep = (typeof APPROACH)[number];
export type WorkItem = (typeof WORK)[number];
export type PageId = (typeof PAGES)[number];

/**
 * Service mega-menu entries. Was an inline JSON literal inside renderVals()
 * (Quantivo.dc.html line 1940). Image paths are stored root-relative here and
 * wrapped with bgUrl() at the call site so basePath applies.
 */
export const SVC_MENU = [
  { n: '01', label: 'Social Media Management', id: 'svc-social', img: '/img/q-peek-social.jpg' },
  { n: '02', label: 'SEO', id: 'svc-seo', img: '/img/q-peek-seo.jpg' },
  { n: '03', label: 'Google & Meta Ads', id: 'svc-ads', img: '/img/q-peek-ads.jpg' },
  { n: '04', label: 'Branding & Identity', id: 'svc-brand', img: '/img/q-peek-brand.jpg' },
  { n: '05', label: 'Packaging Design', id: 'svc-pack', img: '/img/q-peek-pack.jpg' },
  { n: '06', label: 'Website Development', id: 'svc-web', img: '/img/q-peek-web.jpg' },
  { n: '07', label: '3D Architectural Viz', id: 'svc-arch', img: '/img/q-peek-arch.jpg' },
  { n: '08', label: '3D Product Viz', id: 'svc-prod', img: '/img/q-peek-prod.jpg' },
] as const;

/** Partner marquee names. Was an inline array in renderVals() (Quantivo.dc.html L1937). */
export const PARTNERS = [
  'Koral Architecture', 'Aura Monolith', 'Nevada Ventures', 'Studio Helvetica',
  'Cortex Systems', 'Verdant Labs', 'Lumen & Co.', 'Foundry Apparel',
] as const;

/**
 * "Four things we bring" flip cards. Was an inline array in renderVals()
 * (Quantivo.dc.html L1944). `d` is the SVG path for the card's line icon.
 */
export const PILLARS = [
  { k: 'Strategy', v: 'Decisions grounded in your goals.', d: 'M24 4a20 20 0 1 0 .01 0 M24 14a10 10 0 1 0 .01 0 M24 21.5a2.5 2.5 0 1 0 .01 0' },
  { k: 'Creativity', v: 'Ideas that stand out and stick.', d: 'M24 5v11 M24 32v11 M5 24h11 M32 24h11 M11 11l8 8 M29 29l8 8 M37 11l-8 8 M19 29l-8 8' },
  { k: 'Technology', v: 'Built to work, not just to look good.', d: 'M24 7a4.5 4.5 0 1 0 .01 0 M10 32a4.5 4.5 0 1 0 .01 0 M38 32a4.5 4.5 0 1 0 .01 0 M21.5 15.5 13 30 M26.5 15.5 35 30 M17.5 36h13' },
  { k: 'Visualization', v: 'Seeing it before it exists.', d: 'M24 5l17 9.5v19L24 43 7 33.5v-19z M7 14.5 24 24l17-9.5 M24 24v19' },
] as const;

/**
 * Three services featured on the home page. Was an inline array in renderVals()
 * (Quantivo.dc.html L1958). `bg` is root-relative here and wrapped with bgUrl()
 * at the call site; `target` is the detail anchor the original scrolled to.
 */
export const HOME_SERVICES = [
  { num: '02', title: 'SEO', bg: '/img/q-svc-seo.jpg', target: 'svc-seo', blurb: 'A great website needs to be discoverable. Our SEO services help improve visibility in search engines and attract relevant organic traffic from people actively searching for what you offer.' },
  { num: '06', title: 'Website Development', bg: '/img/q-svc-website-development.jpg', target: 'svc-web', blurb: 'Your website is often the most important place where customers interact with your business. We build fast, clear and scalable sites designed around how people actually use them.' },
  { num: '07', title: '3D Architectural Visualization', bg: '/img/q-svc-3d-architectural-visualization.jpg', target: 'svc-arch', blurb: 'Architecture is easier to understand when people can see it. We turn concepts, plans and designs into detailed visual experiences before anything is built.' },
] as const;

/**
 * Home stat counters. Was an inline array in renderVals() (Quantivo.dc.html L1970).
 * `n` is read by the motion layer off data-count and tweened up from 0.
 */
export const STATS = [
  { n: 8, suffix: '+', label: 'Capabilities under one roof' },
  { n: 40, suffix: '+', label: 'Projects delivered' },
  { n: 12, suffix: '+', label: 'Markets served' },
  { n: 4.9, suffix: '', label: 'Average client rating' },
] as const;

/**
 * Testimonial columns. Were inline JSON literals in renderVals()
 * (Quantivo.dc.html L1975-1977). Copy is placeholder in the original too - the
 * page labels it "Dummy copy" - so it is reproduced as-is.
 */
export type Testimonial = {
  initial: string; name: string; role: string; quote: string;
  metric?: string; metricLabel?: string;
};

export const TESTIMONIALS: { items: Testimonial[]; dir: 'up' | 'down' }[] = [
  { dir: 'up', items: [
    { initial: 'A', name: 'Placeholder Name', role: 'Marketing Lead, Client Co.', quote: 'Dummy testimonial copy. Replace with a real client quote about the work and how the collaboration ran.', metric: '+64%', metricLabel: 'organic traffic' },
    { initial: 'D', name: 'Placeholder Name', role: 'Product Manager, SaaS', quote: 'Dummy testimonial copy. Keep quotes conversational rather than promotional so they read as real.' },
    { initial: 'G', name: 'Placeholder Name', role: 'CMO, Manufacturer', quote: 'Dummy testimonial copy. Replace with a quote about strategy sessions and reporting cadence.', metric: '+128%', metricLabel: 'qualified leads' },
    { initial: 'J', name: 'Placeholder Name', role: 'Ops Manager, Hospitality', quote: 'Dummy testimonial copy. Close the set with something about long-term partnership.', metric: '4 yrs', metricLabel: 'working together' },
  ] },
  { dir: 'down', items: [
    { initial: 'B', name: 'Placeholder Name', role: 'Founder, Studio Name', quote: 'Dummy testimonial copy. A short line on responsiveness, clarity of communication, and delivery.' },
    { initial: 'E', name: 'Placeholder Name', role: 'Director, Architecture Firm', quote: 'Dummy testimonial copy. Mention the specific service the client bought and what changed after.', metric: '11 days', metricLabel: 'to first render' },
    { initial: 'H', name: 'Placeholder Name', role: 'Growth Lead, Marketplace', quote: 'Dummy testimonial copy. Short quotes read better in a scrolling column than long paragraphs.' },
    { initial: 'K', name: 'Placeholder Name', role: 'Founder, Fintech', quote: 'Dummy testimonial copy. Swap these for real quotes with client permission before launch.' },
  ] },
  { dir: 'up', items: [
    { initial: 'C', name: 'Placeholder Name', role: 'Head of Brand, Retailer', quote: 'Dummy testimonial copy. Two sentences work best here — one on the problem, one on the outcome.', metric: '3.2x', metricLabel: 'return on ad spend' },
    { initial: 'F', name: 'Placeholder Name', role: 'Owner, D2C Brand', quote: 'Dummy testimonial copy. A line about packaging and how it performed on shelf or in unboxing.' },
    { initial: 'I', name: 'Placeholder Name', role: 'Creative Director, Agency', quote: 'Dummy testimonial copy. Useful for a note on visual craft and attention to detail.' },
    { initial: 'L', name: 'Placeholder Name', role: 'Brand Manager, FMCG', quote: 'Dummy testimonial copy. A sentence on how the team handled feedback and revisions.' },
  ] },
];

/**
 * Insight cards. These were hardcoded five times in the markup
 * (Quantivo.dc.html L554-627) rather than driven by a list; lifted to data here
 * so the card is written once.
 */
export const ARTICLES = [
  { img: '/img/q-art-1.jpg', date: 'July . 2026', title: 'Building a Search Foundation That Lasts', desc: 'What actually moves organic traffic when the quick wins run out, and why structure beats volume.', tags: ['SEO', 'Content'] },
  { img: '/img/q-art-2.jpg', date: 'June . 2026', title: 'When a Rebrand Is Actually Worth It', desc: 'Three signals that tell you the identity is holding the business back, and three that do not.', tags: ['Branding', 'Strategy'] },
  { img: '/img/q-art-3.jpg', date: 'June . 2026', title: 'Why Product Renders Beat Photo Shoots', desc: 'Cost, control and turnaround — how 3D changes what a product launch can look like.', tags: ['3D', 'Product'] },
  { img: '/img/q-art-4.jpg', date: 'May . 2026', title: 'Designing Websites Around Business Goals', desc: 'Start from the decision a visitor needs to make, not from the sections a template offers.', tags: ['Web Design', 'UX'] },
  { img: '/img/q-art-5.jpg', date: 'May . 2026', title: 'One Partner vs. Five Vendors', desc: 'Where consolidation saves time, and where specialist help is still the right call.', tags: ['Strategy'] },
] as const;

/* ── About page data. All were inline arrays in renderVals(). ─────────────── */

export const BELIEFS = [
  'Every brand has different goals.',
  'Every audience has different expectations.',
  'Every project needs the right approach.',
] as const;

export const CAPABILITIES = [
  { n: '01', title: 'Digital Growth', body: 'We help businesses strengthen their online presence through:', items: ['Social Media Management', 'SEO', 'Google Ads', 'Meta Ads Management'] },
  { n: '02', title: 'Brand & Creative', body: 'We help businesses build identities and experiences people remember through:', items: ['Branding & Identity', 'Packaging Design'] },
  { n: '03', title: 'Digital Experiences', body: 'We create modern and functional online experiences through:', items: ['Website Development'] },
  { n: '04', title: '3D Visualization', body: 'We bring ideas, products, and spaces to life through:', items: ['3D Architectural Visualization', '3D Product Visualization'] },
] as const;

export const ABOUT_STEPS = [
  { title: 'Understand', body: 'Every successful project starts with understanding. We learn about your business, goals, audience, challenges, and vision.' },
  { title: 'Strategize', body: 'We identify the right direction and create a clear approach based on what your business actually needs.' },
  { title: 'Create', body: 'We combine creativity and technical expertise to transform ideas into meaningful solutions.' },
  { title: 'Refine', body: 'We review, improve, and optimize the work to make sure every important detail works together.' },
  { title: 'Deliver', body: 'We deliver solutions designed to support your brand, your audience, and your goals.' },
] as const;

export const WHY_US = [
  { title: 'Strategic Thinking', body: 'Every decision starts with understanding the purpose behind the work.' },
  { title: 'Creative Perspective', body: 'We look for ideas and solutions that help brands stand out.' },
  { title: 'Technical Capability', body: 'From websites to detailed 3D visualization, we combine creative thinking with practical execution.' },
  { title: 'Global Perspective', body: 'We work with businesses across different markets and adapt our thinking to different audiences and opportunities.' },
  { title: 'Collaborative Partnership', body: 'We believe good communication and collaboration lead to better results.' },
] as const;

/** Team carousel. _initTeam syncs [data-team-card] with [data-team-bio] by index. */
export const TEAM = [
  { slot: 'qv-team-1', bio: 'Quantivo exists to give ambitious businesses one partner for strategy, craft and delivery — not five vendors pulling in different directions.', name: 'Name Surname', role: 'Founder & Creative Director' },
  { slot: 'qv-team-2', bio: 'The work I care about is the kind that survives contact with a real budget. Quantivo lets us plan campaigns around outcomes, not vanity metrics.', name: 'Name Surname', role: 'Head of Digital Marketing' },
  { slot: 'qv-team-3', bio: 'Seeing a space or product before it exists changes how clients decide. That is the part of Quantivo I find most rewarding.', name: 'Name Surname', role: 'Lead 3D Visualization Artist' },
  { slot: 'qv-team-4', bio: 'A site should make one decision easy for the visitor. At Quantivo the build starts from that decision, not from a template.', name: 'Name Surname', role: 'Web Development Lead' },
  { slot: 'qv-team-5', bio: 'Identity is a promise repeated consistently. Quantivo gives us the room to design that promise properly, across every surface.', name: 'Name Surname', role: 'Brand & Packaging Designer' },
  { slot: 'qv-team-6', bio: 'My job is to keep the brief honest. Quantivo works best when the client and the team are looking at the same problem.', name: 'Name Surname', role: 'Client Partner' },
] as const;

/** Journey rail. `left` is the absolute x on the 3400px track - _initYearRail translates it. */
export const JOURNEY = [
  { left: 120, year: '2021', body: 'Quantivo Digital starts as a small creative team focused on branding and social media.', img: '/img/q-yr-2021.jpg' },
  { left: 740, year: '2022', body: 'Performance marketing and SEO join the offering as client programmes grow.', img: '/img/q-yr-2022.jpg' },
  { left: 1360, year: '2023', body: 'Website development brought in-house, connecting design and build.', img: '/img/q-yr-2023.jpg' },
  { left: 1980, year: '2024', body: '3D visualization studio launches for architecture and product clients.', img: '/img/q-yr-2024.jpg' },
  { left: 2600, year: '2025', body: 'Working with businesses across multiple international markets.', img: '/img/q-yr-2025.jpg' },
] as const;
