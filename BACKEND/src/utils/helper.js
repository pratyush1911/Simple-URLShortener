import { nanoid } from "nanoid";
export const generateNanoId = (length) => {
  return nanoid(length);
};

export const ensureUrlWithProtocol = (url) => {
  if (!url) return url;
  const trimmed = String(url).trim();
  // If URL already has a scheme (e.g., http:// or https:// or ftp://), return as-is
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) return trimmed;
  // Otherwise default to http://
  return `http://${trimmed}`;
};
