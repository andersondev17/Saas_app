"use client";

import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSubject = searchParams.get("subject") ?? "all";

    const handleSubjectChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all") {
            params.delete("subject");
        } else {
            params.set("subject", value);
        }

        const newUrl = params.toString() ? `?${params.toString()}` : "/companions";
        router.push(newUrl, { scroll: false });
    };

    return (
        <Select onValueChange={handleSubjectChange} value={currentSubject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent className="select-content">
                <SelectItem value="all" className="select-item">
                    All Subjects
                </SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="selected-item2 " >
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;