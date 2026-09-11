export const certificateKeys = {
  all: ["certificate"] as const,
  lists: () => [...certificateKeys.all, "list"] as const,
  detail: (id: string) => [...certificateKeys.all, "detail", id] as const,
};
