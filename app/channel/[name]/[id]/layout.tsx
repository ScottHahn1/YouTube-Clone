import ChannelHeader from "./header";
import ChannelNavbar from "./navbar";

export default async function Layout({ children, params }:  
    Readonly<{
        children: React.ReactNode;
        params: Promise<{ name: string, id: string }>
}>) {
    const { name, id } = await params;

    return (
        <>
            <ChannelHeader />
            <ChannelNavbar id={id} title={name} />
            <main>{children}</main>
        </>
    );
};