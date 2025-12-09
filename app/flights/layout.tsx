export default function FlightsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="py-4 px-6 lg:py-12 lg:px-16">
            {children}
        </div>
    );
}