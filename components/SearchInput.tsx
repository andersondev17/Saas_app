'use client';

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
 
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {// Debounce to avoid repeated calls while typing
            const params = new URLSearchParams(searchParams.toString());
            
            if (searchQuery) {
                params.set("topic", searchQuery);
            } else {
                params.delete("topic");
            }

            const newUrl = params.toString() ? `?${params.toString()}` : pathname;
            router.push(newUrl, { scroll: false });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;