import { PageHeader } from "./header";

export function EmptyState() {
    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto text-center">
                <PageHeader />
                <p className="text-gray-400">No news articles available at the moment.</p>
            </div>
        </div>
    )
}
