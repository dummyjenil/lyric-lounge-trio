
import { Song } from '@/types/music';

// Sample song data - Note: Using placeholder lyrics to avoid copyright issues
export const songs: Song[] = [
  {
    id: '1',
    title: 'Dreamy Nights',
    artist: 'The Melodics',
    cover: '/album-covers/dreamy-nights.jpg',
    audioUrl: '/audio/dreamy-nights.mp3',
    lyrics: {
      english: "Verse 1:\nWalking through the city lights\nThinking of you tonight\nMemories flood my mind\nWishing you were by my side\n\nChorus:\nDreamy nights, under starry skies\nHolding you close, time flies\nDreamy nights, feeling so alive\nIn your embrace, paradise\n\nVerse 2:\nDistant echoes of your voice\nHaunting me, no choice\nLonging for your gentle touch\nMissing you so much",
      spanish: "Verso 1:\nCaminando entre las luces de la ciudad\nPensando en ti esta noche\nLos recuerdos inundan mi mente\nDeseando que estuvieras a mi lado\n\nCoro:\nNoches de ensueño, bajo cielos estrellados\nAbrazándote cerca, el tiempo vuela\nNoches de ensueño, sintiéndome tan vivo\nEn tu abrazo, paraíso\n\nVerso 2:\nEcos distantes de tu voz\nAtormentándome, sin elección\nAnhelando tu suave tacto\nExtrañándote tanto",
      french: "Couplet 1:\nMarchant à travers les lumières de la ville\nPensant à toi ce soir\nLes souvenirs inondent mon esprit\nSouhaitant que tu sois à mes côtés\n\nRefrain:\nNuits de rêve, sous des cieux étoilés\nTe tenant proche, le temps s'envole\nNuits de rêve, me sentant si vivant\nDans ton étreinte, paradis\n\nCouplet 2:\nÉchos lointains de ta voix\nMe hantant, sans choix\nDésirant ton doux toucher\nTu me manques tellement"
    }
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Azure Skies',
    cover: '/album-covers/ocean-waves.jpg',
    audioUrl: '/audio/ocean-waves.mp3',
    lyrics: {
      english: "Verse 1:\nBlue horizon stretching wide\nEndless ocean, timeless tide\nFeeling small beneath the sky\nLetting all my worries fly\n\nChorus:\nOcean waves crashing on the shore\nCleansing souls forevermore\nOcean waves, nature's soothing sound\nBringing peace that I have found\n\nVerse 2:\nSalt air filling up my lungs\nSunset colors, brightly hung\nFootprints washing from the sand\nTime is passing, hand in hand",
      spanish: "Verso 1:\nHorizonte azul extendiéndose ampliamente\nOcéano sin fin, marea atemporal\nSintiéndome pequeño bajo el cielo\nDejando volar todas mis preocupaciones\n\nCoro:\nOlas del océano rompiendo en la orilla\nPurificando almas para siempre\nOlas del océano, sonido relajante de la naturaleza\nTrayendo paz que he encontrado\n\nVerso 2:\nAire salado llenando mis pulmones\nColores del atardecer, brillantemente colgados\nHuellas desapareciendo de la arena\nEl tiempo pasa, de la mano",
      french: "Couplet 1:\nHorizon bleu s'étendant au loin\nOcéan sans fin, marée intemporelle\nMe sentant petit sous le ciel\nLaissant toutes mes inquiétudes s'envoler\n\nRefrain:\nVagues de l'océan se brisant sur le rivage\nPurifiant les âmes à jamais\nVagues de l'océan, son apaisant de la nature\nApportant la paix que j'ai trouvée\n\nCouplet 2:\nAir salé remplissant mes poumons\nCouleurs du coucher de soleil, suspendues brillamment\nEmpreintes de pas se lavant du sable\nLe temps passe, main dans la main"
    }
  },
  {
    id: '3',
    title: 'Mountain High',
    artist: 'Peak Climbers',
    cover: '/album-covers/mountain-high.jpg',
    audioUrl: '/audio/mountain-high.mp3',
    lyrics: {
      english: "Verse 1:\nStanding on the mountain peak\nFeeling strong, no longer weak\nClouds below, sun above\nFilled with wonder, filled with love\n\nChorus:\nMountain high, touching the sky\nBreathing free, spirits fly\nMountain high, world down below\nFinding peace in winter's snow\n\nVerse 2:\nEvergreen trees line the trail\nWhistling winds tell their tale\nNature's beauty all around\nIn this moment, peace is found",
      spanish: "Verso 1:\nDe pie en la cima de la montaña\nSintiéndome fuerte, ya no débil\nNubes abajo, sol arriba\nLleno de asombro, lleno de amor\n\nCoro:\nMontaña alta, tocando el cielo\nRespirando libremente, espíritus volando\nMontaña alta, mundo abajo\nEncontrando paz en la nieve del invierno\n\nVerso 2:\nÁrboles perennes bordean el sendero\nVientos silbantes cuentan su historia\nBelleza de la naturaleza por todas partes\nEn este momento, se encuentra la paz",
      french: "Couplet 1:\nDebout sur le pic de la montagne\nMe sentant fort, non plus faible\nNuages en dessous, soleil au-dessus\nRempli d'émerveillement, rempli d'amour\n\nRefrain:\nMontagne haute, touchant le ciel\nRespirant librement, esprits volants\nMontagne haute, monde en bas\nTrouvant la paix dans la neige d'hiver\n\nCouplet 2:\nArbres à feuilles persistantes bordent le sentier\nVents sifflants racontent leur histoire\nBeauté de la nature tout autour\nDans ce moment, la paix est trouvée"
    }
  }
];
