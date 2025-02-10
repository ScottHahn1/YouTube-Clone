import ChannelHeader from "@/app/channel/[id]/header";
import ChannelNavbar from "./navbar";

export default async function Layout({ children, params }:  
    Readonly<{
        children: React.ReactNode;
        params: { id: string }
}>) {
    
    const { id } = await params;

    return (
        <>
            <ChannelHeader id={id} />
            <ChannelNavbar id={id} />
            <main>{children}</main>
        </>
    )
}