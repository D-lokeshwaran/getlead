import clsx from "clsx";
import { Button as ShadcnButton } from "@/shadcn/components/ui/button";

type ShadcnVariantType = "default" | "link" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
type CustomVariantType = "primary" | "success" | "icon-default" | null | undefined;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ShadcnVariantType | CustomVariantType,
  loading?: boolean | string,
  children?: React.ReactNode;
}

export default function Button({ name, variant, children, ...rest }: ButtonProps) {


    return (
        <ShadcnButton
            {...rest}
            variant={variant as ShadcnVariantType}
            className={clsx(
                "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] focus-visible:outline-blue-500 active:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
                rest?.className,
                {
                    'bg-blue-primary text-[#FFFFFF]': variant === 'primary',
                    'bg-green-primary text-[#FFFFFF]': variant === 'success',
                    'hover:bg-secondary min-w-[0px] px-2': variant === 'icon-default',
                },
            )}
        >
            {rest?.loading === "true" &&
                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            }
            {name || children}
        </ShadcnButton>
    )
}