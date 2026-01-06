import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to access your AI companions and learning sessions',
    robots: {
        index: false,
        follow: false,
    },
};
export default function Page() {
    return (
        <main className='flex items-center justify-center'>
            <SignIn />
        </main>
    );
}
