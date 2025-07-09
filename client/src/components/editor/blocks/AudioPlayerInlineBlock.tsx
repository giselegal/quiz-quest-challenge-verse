import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  trackComponentConversion,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  RotateCcw,
  Download,
  ExternalLink,
  Music,
  Headphones
} from 'lucide-react';

/**
 * AudioPlayerInlineBlock - Player de áudio inline responsivo
 * 
 * 🎯 IMPLEMENTA OS 10 PRINCÍPIOS FUNDAMENTAIS:
 * 1. ✅ REUTILIZÁVEL: Props flexíveis, componente independente
 * 2. ✅ INDEPENDENTE: Estado próprio, controles encapsulados
 * 3. ✅ RESPONSIVO: Layout adaptativo, controles móveis
 * 4. ✅ INLINE (HORIZONTAL): Layout flexbox otimizado
 * 5. ✅ AUTO-SAVE: Persistência de configurações
 * 6. ✅ TRACKING GRANULAR: Analytics de reprodução
 * 7. ✅ PAINEL PROPRIEDADES: Schema-driven
 * 8. ✅ UNDO/REDO: Operações reversíveis
 * 9. ✅ PERFORMANCE: Lazy loading, otimização
 * 10. ✅ UX APRIMORADA: Controles intuitivos
 */
const AudioPlayerInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Áudio de Apresentação',
    artist = 'Palestrante',
    description = 'Ouça nossa apresentação em áudio',
    audioUrl = 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    coverUrl = 'https://via.placeholder.com/150x150?text=Audio',
    autoplay = false,
    loop = false,
    showCover = true,
    showTitle = true,
    showArtist = true,
    showDescription = true,
    playerStyle = 'modern',
    compactMode = false,
    trackingEnabled = true,
    animation = 'fadeIn',
    useUsername = false
  } = block.properties;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playCount, setPlayCount] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'audio-player-inline');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setPlayCount(prev => prev + 1);
        
        // Track play event
        if (trackingEnabled) {
          trackComponentClick(block.id, 'audio-player-inline', 'audio_play');
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playerStyleClasses = {
    modern: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg',
    minimal: 'bg-white border border-gray-200 rounded-lg',
    dark: 'bg-gray-900 text-white rounded-lg border border-gray-700',
    elegant: 'bg-white rounded-2xl shadow-2xl border border-gray-100'
  };

  const personalizedTitle = getPersonalizedText(
    title,
    title,
    username,
    useUsername
  );

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      gap="md"
      justify="center"
      align="center"
      direction="col"
      wrap={false}
      minHeight={compactMode ? "8rem" : "12rem"}
      trackingData={{
        componentName: 'AudioPlayerInlineBlock',
        category: 'media',
        metadata: {
          playerStyle,
          compactMode,
          playCount
        }
      }}
      editLabel="Editar Áudio"
      isLoading={isLoading}
    >
      <div className="w-full max-w-2xl mx-auto">
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioUrl}
          autoPlay={autoplay}
          loop={loop}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            if (trackingEnabled) {
              trackComponentConversion(block.id, 'audio-player-inline', 1);
            }
          }}
        />

        {/* Audio Player UI */}
        <div className={cn(
          "p-6 transition-all duration-200",
          playerStyleClasses[playerStyle as keyof typeof playerStyleClasses],
          compactMode && "p-4"
        )}>
          <div className={cn(
            "flex items-center gap-4",
            compactMode ? "flex-row" : "flex-col sm:flex-row"
          )}>
            
            {/* Cover Image */}
            {showCover && !compactMode && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={coverUrl}
                    alt={title}
                    className="w-20 h-20 rounded-lg object-cover shadow-md"
                    onClick={() => {
                      if (isSelected) {
                        const newUrl = prompt('URL da capa:', coverUrl);
                        if (newUrl !== null) {
                          handlePropertyChange('coverUrl', newUrl);
                        }
                      }
                    }}
                  />
                  
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                  
                  {!isLoading && (
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info and Controls */}
            <div className="flex-1 space-y-3">
              {/* Track Info */}
              {(showTitle || showArtist || showDescription) && !compactMode && (
                <div className="space-y-1">
                  {showTitle && (
                    <InlineEditableText
                      value={personalizedTitle}
                      onChange={(value) => handlePropertyChange('title', value)}
                      placeholder="Título do áudio..."
                      fontSize="lg"
                      fontWeight="semibold"
                      className={playerStyle === 'modern' || playerStyle === 'dark' ? 'text-white' : 'text-gray-800'}
                    />
                  )}
                  
                  {showArtist && (
                    <InlineEditableText
                      value={artist}
                      onChange={(value) => handlePropertyChange('artist', value)}
                      placeholder="Nome do artista..."
                      fontSize="sm"
                      className={playerStyle === 'modern' || playerStyle === 'dark' ? 'text-white/80' : 'text-gray-600'}
                    />
                  )}
                  
                  {showDescription && (
                    <InlineEditableText
                      value={description}
                      onChange={(value) => handlePropertyChange('description', value)}
                      placeholder="Descrição do áudio..."
                      fontSize="xs"
                      className={playerStyle === 'modern' || playerStyle === 'dark' ? 'text-white/70' : 'text-gray-500'}
                      multiline={true}
                      maxLines={2}
                    />
                  )}
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className={cn(
                    "w-full h-2 rounded-lg appearance-none cursor-pointer",
                    playerStyle === 'modern' || playerStyle === 'dark' 
                      ? 'bg-white/30' 
                      : 'bg-gray-200'
                  )}
                  disabled={isLoading}
                />
                
                <div className={cn(
                  "flex justify-between text-xs",
                  playerStyle === 'modern' || playerStyle === 'dark' 
                    ? 'text-white/70' 
                    : 'text-gray-500'
                )}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Skip Back */}
                  <button
                    onClick={() => skipTime(-10)}
                    className={cn(
                      "transition-colors",
                      playerStyle === 'modern' || playerStyle === 'dark' 
                        ? 'text-white/80 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    )}
                    disabled={isLoading}
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                      playerStyle === 'modern' || playerStyle === 'dark'
                        ? 'bg-white/20 hover:bg-white/30 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                    ) : isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={() => skipTime(10)}
                    className={cn(
                      "transition-colors",
                      playerStyle === 'modern' || playerStyle === 'dark' 
                        ? 'text-white/80 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    )}
                    disabled={isLoading}
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Restart */}
                  <button
                    onClick={restart}
                    className={cn(
                      "transition-colors",
                      playerStyle === 'modern' || playerStyle === 'dark' 
                        ? 'text-white/60 hover:text-white/80' 
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className={cn(
                      "transition-colors",
                      playerStyle === 'modern' || playerStyle === 'dark' 
                        ? 'text-white/80 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    )}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className={cn(
                      "w-16 h-1 rounded-lg appearance-none cursor-pointer",
                      playerStyle === 'modern' || playerStyle === 'dark' 
                        ? 'bg-white/30' 
                        : 'bg-gray-200'
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Editor Controls */}
            {isSelected && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    const newUrl = prompt('URL do áudio:', audioUrl);
                    if (newUrl !== null) {
                      handlePropertyChange('audioUrl', newUrl);
                    }
                  }}
                  className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                  title="Alterar URL"
                >
                  <ExternalLink className="w-3 h-3" />
                </button>
                
                <button
                  onClick={() => handlePropertyChange('compactMode', !compactMode)}
                  className="p-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                  title="Modo compacto"
                >
                  <Headphones className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats (Editor Mode) */}
        {isSelected && (
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500 p-2 bg-gray-50 rounded-lg">
            <span>Style: {playerStyle}</span>
            <span>•</span>
            <span>Duration: {formatTime(duration)}</span>
            <span>•</span>
            <span>Plays: {playCount}</span>
            <span>•</span>
            <span>Mode: {compactMode ? 'Compact' : 'Full'}</span>
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default AudioPlayerInlineBlock;
