"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
    const router = useRouter();

    return (
        <div>
            <h1>Billing</h1>
            <p>This is the billing page.</p>
            <Button onClick={() => router.back()}>Back</Button>
        </div>
    )
}
