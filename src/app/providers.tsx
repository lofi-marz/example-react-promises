'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WithChildrenProps } from '@/types';

const queryClient = new QueryClient();
export function Providers({ children }: WithChildrenProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
