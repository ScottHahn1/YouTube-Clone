'use client';
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChannelNavbarProvider } from "./contexts/channelNavbarContext";
import NavbarSidebarWrapper from "./NavbarSidebarWrapper";

const queryClient = new QueryClient();

export default function QueryClientContextProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChannelNavbarProvider>
        <NavbarSidebarWrapper />
        {children}
      </ChannelNavbarProvider>
    </QueryClientProvider>
  )
};