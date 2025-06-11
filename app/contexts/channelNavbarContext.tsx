'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ChannelNavbarContextType {
	showNavbar: boolean;
	setShowNavbar: Dispatch<SetStateAction<boolean>>
};

const ChannelNavbarContext = createContext<ChannelNavbarContextType | null>(null);

export const ChannelNavbarProvider = ({ children }: { children: ReactNode }) => {
	const [showNavbar, setShowNavbar] = useState(false);

	return (
		<ChannelNavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
			{children}
		</ChannelNavbarContext.Provider>
	)
};

export const useNavbarVisibility = () => {
	const context = useContext(ChannelNavbarContext);

	if (!context) {
		throw new Error('useNavbarVisibility must be used within a ChannelNavbarProvider');
	};

	return context;
};