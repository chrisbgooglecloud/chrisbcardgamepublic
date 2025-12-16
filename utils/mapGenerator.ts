
import { MapLayer, MapNode, MapNodeType } from '../types';

const LAYERS_PER_ACT = 16; // 15 Playable + 1 Boss

const getRandomType = (act: number, layerIndex: number): MapNodeType => {
  // Base Weights (GDD)
  // Battle: 45%, Event: 22%, Elite: 16%, Rest: 12%, Shop: 5%
  let weights = {
    BATTLE: 0.45,
    EVENT: 0.22,
    ELITE: 0.16,
    REST: 0.12,
    SHOP: 0.05
  };

  // --- ACT SPECIFIC TUNING ---
  if (act === 1) {
    // Act 1: The Server Closet
    if (layerIndex < 5) {
      // Modifier: No Elites allowed before Layer 6 (Index 5)
      weights.ELITE = 0;
      weights.BATTLE += 0.16; // Redistribute to Battle
    }
    // Density: Higher frequency of Rest Sites
    weights.REST = 0.18;
    weights.BATTLE -= 0.06;
  } else if (act === 2) {
    // Act 2: Lift & Shift
    // Modifier: Unknown Events frequency increased to 30%
    weights.EVENT = 0.30;
    weights.BATTLE -= 0.08;
  } else if (act === 3) {
    // Act 3: Vertex Vanguard
    // Modifier: Elite frequency increased to 25%
    weights.ELITE = 0.25;
    weights.BATTLE -= 0.09;
  }

  // --- ROLL ---
  const roll = Math.random();
  let cumulative = 0;

  cumulative += weights.BATTLE;
  if (roll < cumulative) return 'BATTLE';

  cumulative += weights.EVENT;
  if (roll < cumulative) return 'EVENT';

  cumulative += weights.ELITE;
  if (roll < cumulative) return 'ELITE';

  cumulative += weights.REST;
  if (roll < cumulative) return 'REST';

  return 'SHOP';
};

export const generateMap = (act: number): MapLayer[] => {
  const layers: MapLayer[] = [];

  // 1. Create Skeleton & Nodes
  for (let i = 0; i < LAYERS_PER_ACT; i++) {
    const isStart = i === 0;
    const isBoss = i === LAYERS_PER_ACT - 1; // Index 15
    const isFinalRest = i === LAYERS_PER_ACT - 2; // Index 14 (Layer 15)

    // Path Width: 2 to 4 horizontal nodes
    // (Spec says 3-5, but kept 2-4 to prevent UI overcrowding based on user feedback)
    let nodeCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4

    if (isStart) nodeCount = 3; // Layer 1: Fixed at 3
    if (isBoss) nodeCount = 1; // Layer 16: Fixed at 1

    const nodes: MapNode[] = [];
    const segmentSize = 100 / (nodeCount + 1);

    for (let j = 0; j < nodeCount; j++) {
      let type: MapNodeType = 'BATTLE';

      // --- FIXED LAYER ANCHORS ---
      if (isStart) {
        type = 'BATTLE'; // Layer 1: Entry Point
      } else if (isBoss) {
        type = 'BOSS';   // Layer 16: The Boss
      } else if (isFinalRest) {
        type = 'REST';   // Layer 15: The Final Rest
      } else if (i === 5) {
        // Layer 6: The Early Test (High Elite Chance)
        // In Act 1, this is the first time they see an Elite
        type = Math.random() > 0.3 ? 'ELITE' : 'BATTLE';
      } else if (i === 8) {
        // Layer 9: The Mid-Point (Guaranteed Shop or Event/Treasure)
        type = Math.random() > 0.5 ? 'SHOP' : 'EVENT';
      } else if (act === 3 && (i === 11 || i === 12)) {
        // Act 3: Shops appear later (Layer 12-13)
        type = Math.random() > 0.7 ? 'SHOP' : getRandomType(act, i);
      } else {
        // Random Distribution
        type = getRandomType(act, i);
      }

      // X Positioning
      let xPos = segmentSize * (j + 1);

      // Force center the boss
      if (isBoss) xPos = 50;

      // Remove jitter to keep clean grid lines
      nodes.push({
        id: `L${i}-N${j}`,
        layerIndex: i,
        type: type,
        status: isStart ? 'AVAILABLE' : 'LOCKED',
        next: [],
        parents: [],
        x: xPos
      });
    }
    layers.push({ nodes });
  }

  // 2. Connect Edges (The "Cables")
  for (let i = 0; i < LAYERS_PER_ACT - 1; i++) {
    const currentLayer = layers[i];
    const nextLayer = layers[i + 1];

    currentLayer.nodes.forEach((node, nodeIndex) => {
      // Logic: Connect to physically closest nodes in next layer
      let targets: number[] = [];

      const ratio = nextLayer.nodes.length / currentLayer.nodes.length;
      const projectedIndex = nodeIndex * ratio;

      // Always connect to the closest
      const closest = Math.round(projectedIndex);
      targets.push(Math.min(Math.max(0, closest), nextLayer.nodes.length - 1));

      // Chance to add a second path (branching) for complexity
      if (Math.random() > 0.4 && nextLayer.nodes.length > 1) {
        const second = Math.random() > 0.5 ? closest - 1 : closest + 1;
        if (second >= 0 && second < nextLayer.nodes.length && !targets.includes(second)) {
          targets.push(second);
        }
      }

      targets.forEach(tIdx => {
        const targetNode = nextLayer.nodes[tIdx];
        if (targetNode) {
          node.next.push(targetNode.id);
          targetNode.parents.push(node.id);
        }
      });
    });
  }

  // 3. Cleanup Orphans (Ensure connectivity)
  // Check for nodes in layer i+1 with no parents, force connection from i
  for (let i = 1; i < LAYERS_PER_ACT; i++) {
    const layer = layers[i];
    const prevLayer = layers[i - 1];

    layer.nodes.forEach(node => {
      if (node.parents.length === 0) {
        // Force connect from the closest node in previous layer
        let closestParent = prevLayer.nodes[0];
        let minDist = 999;
        prevLayer.nodes.forEach(p => {
          const dist = Math.abs(p.x - node.x);
          if (dist < minDist) {
            minDist = dist;
            closestParent = p;
          }
        });
        closestParent.next.push(node.id);
        node.parents.push(closestParent.id);
      }
    });
  }

  return layers;
};
