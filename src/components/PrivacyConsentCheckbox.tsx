import Link from "next/link";
import type { ReactNode } from "react";

type PrivacyConsentCheckboxProps = {
    checked: boolean;
    children?: ReactNode;
    id: string;
    onChange: (checked: boolean) => void;
    theme?: "light" | "dark";
};

export default function PrivacyConsentCheckbox({
    checked,
    children,
    id,
    onChange,
    theme = "dark",
}: PrivacyConsentCheckboxProps) {
    const isDark = theme === "dark";

    return (
        <label
            htmlFor={id}
            className={`flex items-start gap-3 rounded-xl border p-4 font-montserrat text-xs leading-relaxed ${
                isDark
                    ? "border-white/10 bg-white/5 text-white/70"
                    : "border-[#1D0E22]/10 bg-[#1D0E22]/5 text-[#1D0E22]/70"
            }`}
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
            />
            <span>
                {children || "Súhlasím so spracovaním osobných údajov podľa"}{" "}
                <Link
                    href="/osobne-udaje"
                    className={`underline underline-offset-4 transition-colors ${
                        isDark ? "text-gold hover:text-white" : "text-[#1D0E22] hover:text-gold"
                    }`}
                >
                    Ochrana osobných údajov
                </Link>
                .
            </span>
        </label>
    );
}
