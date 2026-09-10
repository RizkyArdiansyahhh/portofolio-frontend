export const stackKeys = {
  all: ["stack"] as const,
  lists: () => [...stackKeys.all, "list"] as const,
  detail: (id: string) => [...stackKeys.all, "detail", id] as const,
};