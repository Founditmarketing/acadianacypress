import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "./constants";

interface PageSEOProps {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/products" or "/" — combined with SITE_URL for canonical/og:url. */
  path: string;
  /** Root-relative or absolute image URL; defaults to the site's og image. */
  image?: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function absoluteUrl(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

/**
 * Imperatively manages <head> tags for the current route: title, description,
 * OG/Twitter tags, canonical link, robots meta, and an optional JSON-LD block.
 * No SSR in this app, so a plain useEffect head-manager avoids an extra
 * dependency (react-helmet-async) that would add nothing here.
 */
export default function PageSEO({
  title,
  description,
  path,
  image,
  noIndex,
  jsonLd,
}: PageSEOProps) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("property", "og:image", absoluteUrl(image ?? DEFAULT_OG_IMAGE));
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:image", absoluteUrl(image ?? DEFAULT_OG_IMAGE));

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    let robotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noIndex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute("content", "noindex, nofollow");
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, noIndex, jsonLdString]);

  return null;
}
