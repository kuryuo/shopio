import { Loader2 } from "lucide-react";

export function Loader({ text }: { text?: string }) {
    return (
        <div className="flex items-center justify-center gap-2 text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            {text && <span>{text}</span>}
        </div>
    );
}
