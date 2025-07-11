import Image from "next/image";

export function PageHeader() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center mb-8">
                <Image alt="logo" src="/assets/logo/logo.png" width={200} height={48.2} />
            </div>
            <div>
                <p className="text-white uppercase font-medium text-5xl">NEWS</p>
            </div>
        </div>
    )
}
