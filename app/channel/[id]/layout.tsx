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
            <ChannelHeader />
            <ChannelNavbar id={id} />
            <main>{children}</main>
        </>
    )
}