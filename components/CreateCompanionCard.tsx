import Image from "next/image";
import Link from "next/link";

const CreateCompanionCard = () => {
    return (
        <Link href="/companions/new" className="block group build-button">
            <article className="build-companion-card rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-dashed border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-row sm:flex-col items-center justify-center h-full min-h-[18px] sm:min-h-[180px] gap-4 text-center">
                    <div className="size-12 sm:size-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110 transform">
                        <Image
                            src="/icons/plus.svg"
                            alt="Create"
                            width={24}
                            height={24}
                            className="invert opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-2">
                        <h2 className="hidden sm:block text-2xl font-bold text-white">
                            New Companion
                        </h2>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default CreateCompanionCard;