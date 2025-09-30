import { useEffect } from "react";

export const useCooldown = (cooldown, setCooldown) => {
    // Đồng hồ đếm ngược lần kiểm tra tiếp
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);
}