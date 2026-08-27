import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Internal rename (kept)
      { source: "/sluzby/kozmetika", destination: "/sluzby/beauty-therapy", permanent: true },

      // --- Legacy viktorija.sk (WordPress) URL -> new structure 301s ---
      // About / references
      { source: "/o-mne", destination: "/", permanent: true },
      { source: "/referencie", destination: "/", permanent: true },

      // Permanent make-up
      { source: "/permanentny-make-up", destination: "/sluzby/permanentny-makeup", permanent: true },
      { source: "/permanentny-make-up-obocia", destination: "/sluzby/permanentny-makeup/obocie", permanent: true },
      { source: "/permanentny-make-up-ocne-linky", destination: "/sluzby/permanentny-makeup/ocne-linky", permanent: true },
      { source: "/permanentny-make-up-pier", destination: "/sluzby/permanentny-makeup/pery", permanent: true },

      // Paramedical / dermopigmentation (consolidated)
      { source: "/rekonstrukcia-prsnej-bradavky", destination: "/sluzby/permanentny-makeup/dermopigmentacia", permanent: true },
      { source: "/kamuflaz-vitiliga", destination: "/sluzby/permanentny-makeup/dermopigmentacia", permanent: true },
      { source: "/kamuflaz-jaziev", destination: "/sluzby/permanentny-makeup/dermopigmentacia", permanent: true },
      { source: "/trichopigmentacia", destination: "/sluzby/permanentny-makeup/dermopigmentacia", permanent: true },

      // Cosmetics / beauty therapy (consolidated)
      { source: "/kozmetika", destination: "/sluzby/beauty-therapy", permanent: true },
      { source: "/procedury", destination: "/sluzby/beauty-therapy", permanent: true },
      { source: "/mezoboost", destination: "/sluzby/beauty-therapy", permanent: true },

      // Cream sales
      { source: "/predaj-kremov", destination: "/sluzby/kremy-sera", permanent: true },

      // Removal & piercing
      { source: "/odstranovanie-permanentneho-mejkapu", destination: "/sluzby/odstranovanie-pmu", permanent: true },
      { source: "/nastrelovanie-nausnic", destination: "/sluzby/nastrelovanie-nausnic", permanent: true },

      // Academy
      { source: "/predaj-laseru-kurzy", destination: "/academia", permanent: true },
      { source: "/predaj-laseru-kurzy2", destination: "/academia", permanent: true },

      // Legacy placeholder (lorem-ipsum) blog posts -> blog index
      { source: "/quis-enim-lobortis-scelerisque-fermentum", destination: "/blog", permanent: true },
      { source: "/purus-gravida-quis-blandit-turpis-cursus-in-hac", destination: "/blog", permanent: true },
      { source: "/magna-sit-amet-purus-gravida-quis-blandit", destination: "/blog", permanent: true },
      { source: "/mauris-augue-neque-gravida-in-fermentum-et-sollicitudin-ac", destination: "/blog", permanent: true },
      { source: "/hendrerit-dolor-magna-eget-est", destination: "/blog", permanent: true },
      { source: "/turpis-egestas-integer-eget-aliquet", destination: "/blog", permanent: true },
      { source: "/nulla-facilisi-etiam-dignissim-diam-quis-enim", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
