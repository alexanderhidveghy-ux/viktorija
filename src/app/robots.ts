import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/osobne-udaje"],
            },
        ],
        sitemap: "https://viktorija.sk/sitemap.xml",
        host: "https://viktorija.sk",
    };
}
