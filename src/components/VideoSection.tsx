import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoSection = () => {
  const { t } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const hasHandledFirstAutopauseRef = useRef(false);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      const newPlayer = new (window as any).YT.Player('youtube-player', {
        videoId: '2A8PP0Xgkms',
        playerVars: {
          autoplay: 1,
          mute: 1,
          start: 17,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            setPlayer(newPlayer);
          },
          onStateChange: (event: any) => {
            const state = event?.data;
            console.log('[VideoSection] onStateChange:', state);
            // If the video auto-pauses once before any manual interaction, force it to keep playing
            if (state === 2 && !hasHandledFirstAutopauseRef.current) {
              console.log('[VideoSection] detected first auto-pause, resuming playback');
              try {
                event.target?.playVideo();
              } catch (e) {
                console.warn('[VideoSection] error while forcing play after auto-pause:', e);
              }
              hasHandledFirstAutopauseRef.current = true;
            }
          },
        },
      });
    };
  }, []);

  const toggleMute = () => {
    if (player && isReady) {
      // Toggle locked state and set mute accordingly
      setIsLocked(!isLocked);
      if (isLocked) {
        // If unlocking, mute the video
        player.mute();
        setIsMuted(true);
        player.playVideo();
      } else {
        // If locking, unmute the video
        player.unMute();
        setIsMuted(false);
        player.playVideo();
      }
    }
  };

  const handleMouseEnter = () => {
    console.log('[VideoSection] mouse enter, isReady:', isReady, 'isMuted:', isMuted, 'isLocked:', isLocked);
    // Only auto-unmute on hover if not locked and the video is already playing
    if (
      player &&
      isReady &&
      isMuted &&
      !isLocked &&
      player.getPlayerState &&
      player.getPlayerState() === 1
    ) {
      try {
        console.log('[VideoSection] unmuting on hover, player state before:', player.getPlayerState());
        player.unMute();
        setIsMuted(false);
      } catch (e) {
        console.warn('[VideoSection] error during hover unmute:', e);
      }
    }
  };

  const handleMouseLeave = () => {
    console.log('[VideoSection] mouse leave, isReady:', isReady, 'isMuted:', isMuted, 'isLocked:', isLocked);
    // Only auto-mute on leave if not locked and the video is playing
    if (
      player &&
      isReady &&
      !isMuted &&
      !isLocked &&
      player.getPlayerState &&
      player.getPlayerState() === 1
    ) {
      try {
        console.log('[VideoSection] muting on leave, player state before:', player.getPlayerState());
        player.mute();
        setIsMuted(true);
      } catch (e) {
        console.warn('[VideoSection] error during hover mute:', e);
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div 
          className="relative rounded-lg overflow-hidden shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="aspect-video">
            <div id="youtube-player" ref={iframeRef} className="w-full h-full" />
          </div>
          
          {/* Sound Toggle Button */}
          <Button
            onClick={toggleMute}
            size="lg"
            className={`absolute top-4 right-4 z-10 bg-background/80 text-foreground hover:bg-background/90 shadow-2xl font-semibold rounded-lg backdrop-blur-sm border border-border/20 transition-opacity duration-500 ${
              isLocked ? 'md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto' : 'opacity-100'
            }`}
          >
            {isLocked ? (
              <>
                <Volume2 className="mr-2 h-5 w-5" />
                {t('video.soundLocked')}
              </>
            ) : isMuted ? (
              <>
                <VolumeX className="mr-2 h-5 w-5" />
                {t('video.hoverForSound')}
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-5 w-5" />
                {t('video.lockSound')}
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
