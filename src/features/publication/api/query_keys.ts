export const publicationKeys = {
  all: ["publication"] as const,
  lists: () => [...publicationKeys.all, "list"] as const,
  detail: (id: string) => [...publicationKeys.all, "detail", id] as const,
};
