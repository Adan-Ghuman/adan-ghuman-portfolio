import { Button } from '../ui/Button';
import myPic from '../../assets/my_pic.png';
import { Layers, GitBranch, Server, Rocket, ArrowRight } from 'lucide-react';
import { HeroBackground } from '../ui/HeroBackground';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden" id="about">

            <div className="max-w-[88%] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <div className="w-full order-2 lg:order-1 flex flex-col gap-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-text-primary">
                                Hi, I'm <br />
                                <span className="text-primary">M. Adan Ghuman</span>
                            </h1>

                            <p className="text-lg md:text-xl max-w-lg leading-relaxed text-text-secondary">
                                Architecture-first engineer building production-grade systems.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    className="bg-primary text-text-inverted hover:bg-primary/90 hover:scale-105 rounded-full px-8 py-3 font-bold text-base transition-all shadow-[0_0_20px_rgba(192,255,64,0.3)]"
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    View My Work
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-full px-8 py-3 text-base flex items-center gap-2 border-border-strong text-text-primary hover:bg-surface-hover hover:border-border-hover"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Contact Me <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="w-full max-w-xl mt-8 relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative border rounded-xl overflow-hidden shadow-2xl bg-bg-elevated border-border">
                                <div className="px-4 py-2 flex items-center gap-2 border-b bg-bg-sunken border-border">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-dot-red"></div>
                                        <div className="w-3 h-3 rounded-full bg-dot-yellow"></div>
                                        <div className="w-3 h-3 rounded-full bg-dot-green"></div>
                                    </div>
                                    <span className="text-xs font-mono text-text-muted">terminal.js</span>
                                </div>

                                <div className="p-6 font-mono text-sm leading-loose text-text-code">
                                    <div className="space-y-1">
                                        <p><span className="text-syntax-keyword">const</span> developer = {'{'}</p>
                                        <p className="pl-6">name: <span className="text-syntax-string">"M. Adan Ghuman"</span>,</p>
                                        <p className="pl-6">role: <span className="text-syntax-string">"Software Engineer"</span>,</p>
                                        <p className="pl-6">mindset: <span className="text-syntax-special">"Architecture First"</span>,</p>

                                        <p className="pl-6">current_focus: <span className="text-syntax-string">"Production-grade Web Systems"</span>,</p>
                                        <p className="pl-6">principle: <span className="text-syntax-string">"Ship fast. Scale smart. Refactor intentionally."</span></p>
                                        <p>{'};'}</p>
                                        <p className="pt-2"><span className="text-syntax-fn">console</span>.<span className="text-syntax-method">log</span>(<span className="text-text-code">"Deploying excellence..."</span>);</p>
                                    </div>
                                    <div className="mt-4 flex">
                                        <span className="w-2 h-5 bg-primary animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative lg:mt-6">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 scale-110 translate-y-4">
                                <HeroBackground />
                            </div>

                            <div className="relative z-10 w-full rounded-2xl overflow-hidden transition-transform duration-500">
                                <img
                                    src={myPic}
                                    alt="M. Adan Ghuman"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 block"
                                />
                            </div>

                            <div className="absolute -top-6 -right-6 md:-right-12 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg hover:border-primary/30 transition-colors cursor-default backdrop-blur-md border border-border bg-glass z-20">
                                <Layers className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-text-muted">EXPERTISE</p>
                                    <p className="font-bold text-sm text-text-primary">Backend</p>
                                </div>
                            </div>

                            <div className="absolute top-24 -left-6 md:-left-12 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg hover:border-primary/30 transition-colors cursor-default backdrop-blur-md border border-border bg-glass animate-float z-20">
                                <GitBranch className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-text-muted">PERFORMANCE</p>
                                    <p className="font-bold text-sm text-text-primary">Optimized</p>
                                </div>
                            </div>

                            <div className="absolute bottom-32 -right-8 md:-right-16 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg hover:border-primary/30 transition-colors cursor-default backdrop-blur-md border border-border bg-glass animate-float-delayed z-20">
                                <Server className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-text-muted">PRODUCTION</p>
                                    <p className="font-bold text-sm text-text-primary">Ready</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-xl border border-border bg-glass z-20 w-max">
                                <Rocket className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-xs text-text-muted">VELOCITY</p>
                                    <p className="font-bold text-text-primary">Shipping what holds up</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg-base to-transparent pointer-events-none"></div>
        </section>
    );
}
