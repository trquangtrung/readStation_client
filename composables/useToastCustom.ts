export function successToast(message: string, description?: string) {
    const toast = useToast();
    toast.add({
        icon: "i-heroicons-check-badge",
        color: "primary",
        title: message,
        description: description,
        timeout: 5000,
    });
}

export function errorToast(message: string, description?: string) {
    const toast = useToast();
    toast.add({
        icon: "i-heroicons-x-circle",
        color: "red",
        title: message,
        description: description,
        timeout: 5000,
    });
}

export function infoToast(message: string, description?: string) {
    const toast = useToast();
    toast.add({
        icon: "i-heroicons-information-circle",
        color: "blue",
        title: message,
        description: description,
        timeout: 5000,
    });
}

export function warningToast(message: string, description?: string) {
    const toast = useToast();
    toast.add({
        icon: "i-heroicons-shield-exclamation",
        color: "yellow",
        title: message,
        description: description,
        timeout: 5000,
    });
}