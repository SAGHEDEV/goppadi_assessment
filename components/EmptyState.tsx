import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface EmptyStateProps {
    icon?: string;
    message?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    iconSize?: number;
}

export default function EmptyState({
    icon = '/assets/empty-icon.svg',
    message = 'No request yet',
    buttonText = 'Add',
    onButtonClick,
    iconSize = 64
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg">
            {/* Icon/Image */}
            <div className="mb-4 flex items-center justify-center">
                {icon ? (
                    <Image 
                        src={icon} 
                        alt={message} 
                        width={iconSize} 
                        height={iconSize}
                        className="opacity-60"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg 
                            width="40" 
                            height="40" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                            className="text-gray-400"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 9h6M9 15h6" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Message */}
            <p className="text-[#1D2433] font-medium text-base mb-4">
                {message}
            </p>

            {/* Action Button */}
            <Button 
                onClick={onButtonClick}
                className="bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-8 h-10 rounded-lg font-medium"
            >
                {buttonText}
            </Button>
        </div>
    );
}