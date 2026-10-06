export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
