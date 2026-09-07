export const experienceKeys = {
  all: ["experience"] as const,
  lists: () => [...experienceKeys.all, "list"] as const,
  detail: (id: string) => [...experienceKeys.all, "detail", id] as const,
};