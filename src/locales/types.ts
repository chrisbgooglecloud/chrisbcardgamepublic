export interface Translation {
    ui: {
        title: string;
        subtitle: string;
        startButton: string;
        language: string;
        turn: string;
        energy: string;
        block: string;
        drawPile: string;
        discardPile: string;
        exhaustPile: string;
        endTurn: string;
        handFull: string;
        insufficientCompute: string;
        victory: string;
        defeat: string;
        rewards: string;
        chooseCard: string;
        skip: string;
        gold: string;
        shop: string;
        buy: string;
        removeCard: string;
        leave: string;
        event: string;
        rest: string;
        unknown: string;
        battle: string;
        elite: string;
        boss: string;
        map: string;
        deck: string;
        relics: string;
        loading: string;
        modernizing: string;
        navigating: string;
        act: string;
        navigation: string;
        floor: string;
        choosePath: string;
        initiateTravel: string;
        returnToRoot: string;
        migrating: string;
        migrationSuccess: string;
        victoryMessage: string;
        defeatMessage: string;
        bandwidthCap: string;
        launchDeadline: string;
        turnsRemaining: string;
        refactoring: string;
        migrationComplete: string;
        introVideo: string;
        closeVideo: string;
    };
    logs: Record<string, string>;
    combatLog: {
        title: string;
        minimize: string;
        expand: string;
        waiting: string;
    };
    gemini: {
        name: string;
    };
    themes: Record<string, string>;
    mapNodes: Record<string, string>;
    classes: Record<string, {
        name: string;
        description: string;
    }>;
    cards: Record<string, {
        name: string;
        description: string;
        flavorText: string;
    }>;
    enemies: Record<string, {
        name: string;
        description: string;
    }>;
    events: Record<string, {
        title: string;
        narrative: string;
        options: Record<string, {
            label: string;
            description: string;
        }>;
    }>;
    relics: Record<string, {
        name: string;
        description: string;
    }>;
}
