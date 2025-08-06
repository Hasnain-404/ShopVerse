import React, { useEffect } from 'react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser
} from '@clerk/clerk-react';
import axios from 'axios';

const ClerkComponent = () => {
    const { user, isLoaded } = useUser();


    useEffect(() => {
        if (isLoaded && user) {
            const saveUser = async () => {
                try {
                    await axios.post('http://localhost:3000/auth/save-user', {
                        name: user.fullName,
                        email: user.primaryEmailAddress.emailAddress,
                        userId: user.id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });


                } catch (error) {
                    console.error('Error saving user:', error);
                }
            };

            saveUser();
        }
    }, [isLoaded, user]);

    return (
        <header>
            <SignedOut>
                <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </header>
    );
};

export default ClerkComponent;
