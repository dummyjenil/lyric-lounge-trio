
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
  },
  // New songs with the same artists
  {
    id: '4',
    title: 'Midnight Serenade',
    artist: 'The Melodics',
    cover: '/album-covers/dreamy-nights.jpg', // Reusing existing cover as placeholder
    audioUrl: '/audio/dreamy-nights.mp3', // Reusing existing audio as placeholder
    lyrics: {
      english: "Verse 1:\nSilent streets and moonlit roads\nWhere the night unfolds its tales\nGathering stories left untold\nWhispering secrets through the vales\n\nChorus:\nMidnight serenade, calling out your name\nSilver melodies dancing in the rain\nMidnight serenade, stars align above\nPainting dreams with brushes made of love\n\nVerse 2:\nShadows dance against the wall\nTime stands still, yet moves along\nHolding memories in my soul\nCradled gently like a song",
      spanish: "Verso 1:\nCalles silenciosas y caminos iluminados por la luna\nDonde la noche despliega sus cuentos\nRecogiendo historias no contadas\nSusurrando secretos a través de los valles\n\nCoro:\nSerenata de medianoche, llamando tu nombre\nMelodías plateadas bailando en la lluvia\nSerenata de medianoche, estrellas se alinean arriba\nPintando sueños con pinceles hechos de amor\n\nVerso 2:\nSombras bailan contra la pared\nEl tiempo se detiene, pero avanza\nGuardando recuerdos en mi alma\nAcunados suavemente como una canción",
      french: "Couplet 1:\nRues silencieuses et routes éclairées par la lune\nOù la nuit déploie ses contes\nRecueillant des histoires jamais racontées\nChuchotant des secrets à travers les vallées\n\nRefrain:\nSérénade de minuit, appelant ton nom\nMélodies argentées dansant sous la pluie\nSérénade de minuit, étoiles s'alignent au-dessus\nPeignant des rêves avec des pinceaux faits d'amour\n\nCouplet 2:\nOmbres dansent contre le mur\nLe temps s'arrête, mais avance\nGardant des souvenirs dans mon âme\nBercés doucement comme une chanson"
    }
  },
  {
    id: '5',
    title: 'Coastal Dreams',
    artist: 'Azure Skies',
    cover: '/album-covers/ocean-waves.jpg', // Reusing existing cover as placeholder
    audioUrl: '/audio/ocean-waves.mp3', // Reusing existing audio as placeholder
    lyrics: {
      english: "Verse 1:\nSeagulls soar above the bay\nCasting shadows on the waves\nCoastal towns with painted doors\nStories etched on sandy shores\n\nChorus:\nCoastal dreams calling me home\nWhere the sea and sky become one\nCoastal dreams, freedom and peace\nIn this place my heart won't cease\n\nVerse 2:\nLighthouses guard the rocky cliffs\nGuiding souls through misty shifts\nSalty breeze and rustling palms\nNature's perfect healing balms",
      spanish: "Verso 1:\nGaviotas se elevan sobre la bahía\nProyectando sombras sobre las olas\nPueblos costeros con puertas pintadas\nHistorias grabadas en orillas arenosas\n\nCoro:\nSueños costeros llamándome a casa\nDonde el mar y el cielo se vuelven uno\nSueños costeros, libertad y paz\nEn este lugar mi corazón no cesará\n\nVerso 2:\nFaros custodian los acantilados rocosos\nGuiando almas a través de nieblas cambiantes\nBrisa salada y palmas susurrantes\nBálsamos curativos perfectos de la naturaleza",
      french: "Couplet 1:\nMouettes planent au-dessus de la baie\nProjetant des ombres sur les vagues\nVilles côtières aux portes peintes\nHistoires gravées sur les rivages sablonneux\n\nRefrain:\nRêves côtiers m'appelant à la maison\nOù la mer et le ciel ne font qu'un\nRêves côtiers, liberté et paix\nDans cet endroit mon cœur ne cessera pas\n\nCouplet 2:\nPhares gardent les falaises rocheuses\nGuidant les âmes à travers les brumes changeantes\nBrise salée et palmiers bruissants\nBaumes guérisseurs parfaits de la nature"
    }
  },
  {
    id: '6',
    title: 'Summit Calling',
    artist: 'Peak Climbers',
    cover: '/album-covers/mountain-high.jpg', // Reusing existing cover as placeholder
    audioUrl: '/audio/mountain-high.mp3', // Reusing existing audio as placeholder
    lyrics: {
      english: "Verse 1:\nRugged paths and rocky trails\nThrough the mist, adventure calls\nBackpack heavy, spirit light\nPushing forward with all might\n\nChorus:\nSummit calling, feel the pull\nDestination beautiful\nSummit calling, climb so high\nWhere earth connects with endless sky\n\nVerse 2:\nBreath is short but vision's clear\nChallenge faced with little fear\nOne step further, then again\nReaching heights beyond our ken",
      spanish: "Verso 1:\nSenderos escabrosos y caminos rocosos\nA través de la niebla, la aventura llama\nMochila pesada, espíritu ligero\nAvanzando con todas las fuerzas\n\nCoro:\nLa cumbre llamando, siente la atracción\nDestino hermoso\nLa cumbre llamando, escala tan alto\nDonde la tierra se conecta con el cielo sin fin\n\nVerso 2:\nLa respiración es corta pero la visión es clara\nDesafío enfrentado con poco miedo\nUn paso más, y otro\nAlcanzando alturas más allá de nuestro entendimiento",
      french: "Couplet 1:\nSentiers accidentés et chemins rocheux\nÀ travers la brume, l'aventure appelle\nSac à dos lourd, esprit léger\nAvançant avec toute sa force\n\nRefrain:\nSommet appelant, sens l'attraction\nDestination magnifique\nSommet appelant, grimpe si haut\nOù la terre se connecte avec le ciel sans fin\n\nCouplet 2:\nLe souffle est court mais la vision est claire\nDéfi affronté avec peu de crainte\nUn pas de plus, puis encore\nAtteignant des hauteurs au-delà de notre compréhension"
    }
  },
  {
    id: '7',
    title: 'Electric Pulse',
    artist: 'The Melodics',
    cover: '/album-covers/dreamy-nights.jpg', // Reusing existing cover as placeholder
    audioUrl: '/audio/dreamy-nights.mp3', // Reusing existing audio as placeholder
    lyrics: {
      english: "Verse 1:\nLights flash across the crowded floor\nBodies moving, wanting more\nBass drops deep inside my chest\nThis night will be the very best\n\nChorus:\nElectric pulse running through my veins\nBreaking free from all these chains\nElectric pulse, energy so high\nMoment frozen, time goes by\n\nVerse 2:\nDancing shadows merge as one\nUntil the rising of the sun\nMemories made will last for years\nLaughter drowning out our fears",
      spanish: "Verso 1:\nLuces destellan a través del suelo lleno de gente\nCuerpos moviéndose, queriendo más\nGraves retumban dentro de mi pecho\nEsta noche será la mejor\n\nCoro:\nPulso eléctrico corriendo por mis venas\nLiberándome de todas estas cadenas\nPulso eléctrico, energía tan alta\nMomento congelado, el tiempo pasa\n\nVerso 2:\nSombras bailando se fusionan como una\nHasta la salida del sol\nRecuerdos creados durarán por años\nRisas ahogando nuestros miedos",
      french: "Couplet 1:\nLumières clignotent à travers le sol bondé\nCorps en mouvement, voulant plus\nBasses résonnent profondément dans ma poitrine\nCette nuit sera la meilleure\n\nRefrain:\nImpulsion électrique parcourant mes veines\nMe libérant de toutes ces chaînes\nImpulsion électrique, énergie si haute\nMoment figé, le temps passe\n\nCouplet 2:\nOmbres dansantes fusionnent comme une\nJusqu'au lever du soleil\nSouvenirs créés dureront pendant des années\nRires noyant nos peurs"
    }
  },
  {
    id: '8',
    title: 'Azure Horizons',
    artist: 'Azure Skies',
    cover: '/album-covers/ocean-waves.jpg', // Reusing existing cover as placeholder
    audioUrl: '/audio/ocean-waves.mp3', // Reusing existing audio as placeholder
    lyrics: {
      english: "Verse 1:\nWatching as the sky meets sea\nEndless blue infinity\nTime dissolving into space\nNature's perfect sweet embrace\n\nChorus:\nAzure horizons stretching far\nGuiding like a distant star\nAzure horizons, calm and true\nPeace is found in shades of blue\n\nVerse 2:\nSailing through the gentle tide\nSeagulls soaring by my side\nMoments frozen like the view\nPerfect skies of brilliant blue",
      spanish: "Verso 1:\nObservando como el cielo se encuentra con el mar\nAzul infinito sin fin\nTiempo disolviéndose en el espacio\nEl abrazo dulce y perfecto de la naturaleza\n\nCoro:\nHorizontes azules extendiéndose lejos\nGuiando como una estrella distante\nHorizontes azules, tranquilos y verdaderos\nLa paz se encuentra en tonos de azul\n\nVerso 2:\nNavegando a través de la suave marea\nGaviotas planeando a mi lado\nMomentos congelados como la vista\nCielos perfectos de azul brillante",
      french: "Couplet 1:\nObservant comment le ciel rencontre la mer\nBleu infini sans fin\nTemps se dissolvant dans l'espace\nL'étreinte douce et parfaite de la nature\n\nRefrain:\nHorizons azur s'étendant au loin\nGuidant comme une étoile distante\nHorizons azur, calmes et vrais\nLa paix se trouve dans les nuances de bleu\n\nCouplet 2:\nNaviguant à travers la douce marée\nMouettes planant à mes côtés\nMoments figés comme la vue\nCieux parfaits d'un bleu brillant"
    }
  }
];

