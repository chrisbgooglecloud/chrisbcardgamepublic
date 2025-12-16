import { describe, it, expect } from 'vitest';
import { generateMap } from './mapGenerator';

describe('generateMap', () => {
    it('should generate 16 layers for Act 1', () => {
        const map = generateMap(1);
        expect(map).toHaveLength(16);
    });

    it('should have 3 nodes in the first layer', () => {
        const map = generateMap(1);
        expect(map[0].nodes).toHaveLength(3);
        expect(map[0].nodes[0].status).toBe('AVAILABLE');
    });

    it('should have 1 boss node in the last layer', () => {
        const map = generateMap(1);
        const lastLayer = map[map.length - 1];
        expect(lastLayer.nodes).toHaveLength(1);
        expect(lastLayer.nodes[0].type).toBe('BOSS');
    });

    it('should ensure all nodes (except last layer) have children', () => {
        const map = generateMap(1);
        for (let i = 0; i < map.length - 1; i++) {
            const layer = map[i];
            layer.nodes.forEach(node => {
                expect(node.next.length).toBeGreaterThan(0);
            });
        }
    });

    it('should ensure all nodes (except first layer) have parents', () => {
        const map = generateMap(1);
        for (let i = 1; i < map.length; i++) {
            const layer = map[i];
            layer.nodes.forEach(node => {
                expect(node.parents.length).toBeGreaterThan(0);
            });
        }
    });
});
