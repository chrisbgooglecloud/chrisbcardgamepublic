
import React from 'react';
import { MapLayer, MapNode, MapNodeType } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface GameMapProps {
   map: MapLayer[];
   onNodeSelect: (node: MapNode) => void;
   act: number;
   currentLocation: string | null;
}

export const GameMap: React.FC<GameMapProps> = ({ map, onNodeSelect, act, currentLocation }) => {
   const { t } = useLanguage();

   // --- LOGIC: DETERMINE NEXT AVAILABLE NODES ---
   let nextNodes: MapNode[] = [];
   let currentLayerIndex = -1;

   if (currentLocation === null) {
      // Start of Act: Show Layer 0
      nextNodes = map[0].nodes;
      currentLayerIndex = 0;
   } else {
      // Find current node in the map
      // We flatten the map to find the node object
      let currentNode: MapNode | undefined;
      map.forEach(layer => {
         const found = layer.nodes.find(n => n.id === currentLocation);
         if (found) currentNode = found;
      });

      if (currentNode) {
         currentLayerIndex = currentNode.layerIndex + 1;
         // Get the child IDs
         const nextIds = currentNode.next;
         // Find the actual node objects for these IDs
         const nextLayer = map[currentLayerIndex];
         if (nextLayer) {
            nextNodes = nextLayer.nodes.filter(n => nextIds.includes(n.id));
         }
      }
   }

   // Fallback: If we hit a dead end (shouldn't happen) or win, show nothing (handled by app state)
   if (nextNodes.length === 0) {
      return <div className="text-white text-center mt-20">{t.ui.navigating}</div>;
   }

   // --- HELPER: FLAVOR TEXT ---
   const getNodeFlavor = (type: MapNodeType) => {
      switch (type) {
         case 'BATTLE': return t.mapNodes.battle;
         case 'ELITE': return t.mapNodes.elite;
         case 'EVENT': return t.mapNodes.event;
         case 'SHOP': return t.mapNodes.shop;
         case 'REST': return t.mapNodes.rest;
         case 'BOSS': return t.mapNodes.boss;
         default: return t.mapNodes.unknown;
      }
   };

   const getNodeIcon = (type: MapNodeType) => {
      switch (type) {
         case 'BATTLE': return '💀';
         case 'ELITE': return '😈';
         case 'EVENT': return '💾';
         case 'REST': return '🔧';
         case 'SHOP': return '💰';
         case 'BOSS': return '⚠️';
         default: return '❓';
      }
   };

   const getNodeTitle = (type: MapNodeType) => {
      switch (type) {
         case 'BATTLE': return t.ui.battle;
         case 'ELITE': return t.ui.elite;
         case 'EVENT': return t.ui.event;
         case 'SHOP': return t.ui.shop;
         case 'REST': return t.ui.rest;
         case 'BOSS': return t.ui.boss;
         default: return t.ui.unknown;
      }
   };

   const getNodeColor = (type: MapNodeType) => {
      switch (type) {
         case 'BATTLE': return 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-red-900/20';
         case 'ELITE': return 'border-yellow-600 shadow-[0_0_15px_rgba(202,138,4,0.4)] hover:bg-yellow-900/20';
         case 'BOSS': return 'border-red-700 shadow-[0_0_30px_rgba(185,28,28,0.6)] animate-pulse bg-red-900/20';
         case 'EVENT': return 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)] hover:bg-blue-900/20';
         case 'REST': return 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:bg-green-900/20';
         case 'SHOP': return 'border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.4)] hover:bg-yellow-900/20';
      }
   };

   return (
      <div className="relative h-screen w-full bg-legacy-bg flex flex-col items-center justify-center overflow-hidden font-sans">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-40 pointer-events-none"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

         {/* Header */}
         <div className="absolute top-0 w-full h-24 flex flex-col items-center justify-center z-20 bg-black/80 border-b border-gray-700 backdrop-blur-sm">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase">
               {t.ui.act} {act} <span className="text-google-blue">///</span> {t.ui.navigation}
            </h2>
            <div className="flex items-center space-x-2 mt-1 text-gray-400 text-sm font-mono">
               <span>{t.ui.floor} {currentLayerIndex + 1}</span>
               <span className="text-gray-600">/</span>
               <span>16</span>
            </div>
         </div>

         {/* Selection Area */}
         <div className="z-10 w-full max-w-6xl px-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mb-12 tracking-tight drop-shadow-xl">
               {t.ui.choosePath}
            </h1>

            <div className="flex flex-wrap justify-center gap-8 w-full">
               {nextNodes.map((node) => (
                  <div
                     key={node.id}
                     onClick={() => onNodeSelect(node)}
                     className={`
                    group relative w-72 h-96 bg-gray-800/90 rounded-xl border-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105
                    flex flex-col items-center p-6
                    ${getNodeColor(node.type)}
                 `}
                  >
                     {/* Hover Glow */}
                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>

                     {/* Icon */}
                     <div className="w-32 h-32 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center text-6xl shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300">
                        {getNodeIcon(node.type)}
                     </div>

                     {/* Title */}
                     <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-google-blue transition-colors">
                        {getNodeTitle(node.type)}
                     </h3>

                     {/* Divider */}
                     <div className="w-12 h-1 bg-gray-600 mb-4 rounded"></div>

                     {/* Flavor Text */}
                     <p className="text-center text-gray-400 text-sm leading-relaxed font-medium">
                        {getNodeFlavor(node.type)}
                     </p>

                     {/* CTA */}
                     <div className="mt-auto w-full">
                        <div className="w-full py-2 bg-gray-700 group-hover:bg-google-blue text-gray-300 group-hover:text-white text-center font-bold rounded transition-colors uppercase text-xs tracking-widest">
                           {t.ui.initiateTravel}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Footer */}
         <div className="absolute bottom-8 text-gray-500 text-xs uppercase tracking-widest opacity-50">
            System: Ascension // Network Graph v2.4
         </div>
      </div>
   );
};
