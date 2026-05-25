export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || "An error occurred while fetching the data.");
    (error as any).status = res.status;
    (error as any).info = errorData;
    throw error;
  }
  return res.json();
};
