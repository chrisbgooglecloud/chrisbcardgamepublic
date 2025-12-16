import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { CardType, CardCategory } from '../types';

// Mock the useLanguage hook
vi.mock('../src/contexts/LanguageContext', () => ({
    useLanguage: () => ({
        t: {
            cards: {
                'test-card': {
                    name: 'Test Card',
                    description: 'Deal 10 Damage.',
                    flavorText: 'A test flavor text.'
                }
            }
        }
    })
}));

const mockCard = {
    id: 'test-card',
    name: 'Test Card',
    cost: 1,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 10 Damage.',
    flavorText: 'A test flavor text.',
    damage: 10
};

describe('Card Component', () => {
    it('renders card name and cost', () => {
        render(<Card card={mockCard} />);
        expect(screen.getByText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders description and flavor text', () => {
        render(<Card card={mockCard} />);
        expect(screen.getByText('Deal 10 Damage.')).toBeInTheDocument();
        expect(screen.getByText('A test flavor text.')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Card card={mockCard} onClick={handleClick} />);
        fireEvent.click(screen.getByText('Test Card').closest('div')!);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(mockCard);
    });

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn();
        render(<Card card={mockCard} onClick={handleClick} disabled />);
        fireEvent.click(screen.getByText('Test Card').closest('div')!);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
