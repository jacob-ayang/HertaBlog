
export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    isTyping?: boolean;
}

export enum SimulatedUniverseState {
    IDLE = 'IDLE',
    CALCULATING = 'CALCULATING',
    RESPONSE_READY = 'RESPONSE_READY',
    ERROR = 'ERROR'
}

export interface Curio {
    name: string;
    type: 'Curio' | 'Blessing' | 'Error';
    description: string;
    effect: string;
    herta_comment: string;
    rarity: 'Common' | 'Rare' | 'Legendary';
}
