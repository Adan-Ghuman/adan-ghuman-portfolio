import { type LucideIcon } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', startIcon: StartIcon, endIcon: EndIcon, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
                    variant === 'primary' && 'bg-primary text-text-inverted hover:opacity-90 hover:scale-105 rounded-full',
                    variant === 'outline' && 'bg-transparent border border-border-strong text-text-primary hover:bg-surface-hover rounded-xl',
                    variant === 'ghost' && 'bg-transparent hover:bg-surface-hover text-text-primary rounded-lg',
                    {
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-5 py-2.5 text-sm': size === 'md',
                        'px-8 py-4 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {StartIcon && <StartIcon className={cn("mr-2 h-5 w-5", size === 'sm' && "h-4 w-4")} />}
                {children}
                {EndIcon && <EndIcon className={cn("ml-2 h-5 w-5", size === 'sm' && "h-4 w-4")} />}
            </button>
        );
    }
);

Button.displayName = 'Button';
