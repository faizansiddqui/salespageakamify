import { useCallback, useEffect, useRef } from "react";

/**
 * useSoundEngine
 * - WebAudio (super smooth)
 * - iOS unlock on first pointer gesture
 * - click sound
 * - iOS tick sound (continuous while scrolling)
 */

export default function useSoundEngine({
  clickUrl = "/sound/clickSound.MP3",
  tickUrl = "/sound/iosClickScrollSound2Fremes.MP3",
  clickVolume = 0.7,
  tickVolume = 0.7,
} = {}) {
  const audioCtxRef = useRef(null);
  const unlockedRef = useRef(false);

  const clickBufferRef = useRef(null);
  const tickBufferRef = useRef(null);

  // movement detection for continuous iOS tick
  const lastMoveTimeRef = useRef(0);
  const loopRef = useRef(null);

  // tick throttle
  const lastTickAtRef = useRef(0);
  const tickIntervalRef = useRef(70); // default iOS tick speed

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const fetchDecode = async (url) => {
    const ctx = getCtx();
    const res = await fetch(url, { cache: "force-cache" });
    const ab = await res.arrayBuffer();
    return await ctx.decodeAudioData(ab);
  };

  const playBuffer = (buffer, volume) => {
    if (!buffer) return;

    const ctx = getCtx();
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.value = volume;

    src.connect(gain);
    gain.connect(ctx.destination);

    src.start(0);
  };

  // preload buffers
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [clickBuf, tickBuf] = await Promise.all([
          fetchDecode(clickUrl),
          fetchDecode(tickUrl),
        ]);
        if (!mounted) return;

        clickBufferRef.current = clickBuf;
        tickBufferRef.current = tickBuf;
      } catch (e) {
        // ignore
      }
    })();

    return () => {
      mounted = false;
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [clickUrl, tickUrl]);

  /**
   * ✅ unlock audio on iOS
   * call once on first onPointerDown/onTouchStart
   */
  const unlock = useCallback(async () => {
    if (unlockedRef.current) return;

    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") await ctx.resume();

      // play tiny silent sound to unlock
      if (tickBufferRef.current) playBuffer(tickBufferRef.current, 0.0001);

      unlockedRef.current = true;
    } catch (e) {
      // ignore
    }
  }, []);

  // click sound
  const playClick = useCallback(() => {
    if (!unlockedRef.current) return;
    playBuffer(clickBufferRef.current, clickVolume);
  }, [clickVolume]);

  // one tick
  const tickOnce = useCallback(() => {
    if (!unlockedRef.current) return;

    const now = Date.now();
    const interval = tickIntervalRef.current;
    if (now - lastTickAtRef.current < interval) return;

    lastTickAtRef.current = now;
    playBuffer(tickBufferRef.current, tickVolume);
  }, [tickVolume]);

  /**
   * (optional) make tick speed based on velocity
   * velocity range: 0..1+
   */
  const setTickSpeedByVelocity = useCallback((velocity = 0) => {
    const v = Math.min(1.5, Math.abs(velocity));
    // slow=120ms, fast=45ms
    const interval = Math.round(120 - v * 55);
    tickIntervalRef.current = Math.max(45, Math.min(120, interval));
  }, []);

  // start loop
  const startLoop = useCallback(() => {
    if (loopRef.current) return;

    loopRef.current = setInterval(() => {
      const now = Date.now();

      // if moved recently => keep ticking
      if (now - lastMoveTimeRef.current < 120) {
        tickOnce();
      } else {
        clearInterval(loopRef.current);
        loopRef.current = null;
      }
    }, 40);
  }, [tickOnce]);

  /**
   * ✅ call this whenever swiper moving (drag OR momentum)
   * ex: Swiper onSetTranslate => markMoving()
   */
  const markMoving = useCallback((velocity) => {
    lastMoveTimeRef.current = Date.now();
    if (typeof velocity === "number") setTickSpeedByVelocity(velocity);
    startLoop();
  }, [startLoop, setTickSpeedByVelocity]);

  return {
    unlock,
    playClick,
    tickOnce,
    markMoving,
    setTickSpeedByVelocity,
  };
}
