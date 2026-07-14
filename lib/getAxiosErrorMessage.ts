export function getAxiosErrorMessage(error: unknown, fallback = "Une erreur est survenue"): string {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) return response.data.message;
    }

    if (error instanceof Error && error.message) return error.message;
    return fallback;
}
