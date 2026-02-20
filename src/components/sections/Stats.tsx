import { memo } from 'react';
import { stats } from '@/data/stats';

export const Stats = memo(function Stats() {
    return (
        <section className="py-24 cv-auto">
            <div className="max-w-[88%] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="p-8 rounded-2xl backdrop-blur-sm border text-center hover:border-primary/30 transition-colors bg-surface border-border shadow-sm dark:shadow-none">
                            <h3 className="text-5xl font-bold text-primary mb-2 font-display">{stat.value}</h3>
                            <p className="font-medium text-text-secondary">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
