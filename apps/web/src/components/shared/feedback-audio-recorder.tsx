"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";
import { FEEDBACK_AUDIO_MAX_SECONDS } from "@/lib/feedback-audio";

// Chrome, Firefox and Android record webm; Safari records mp4.
const RECORDING_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
// About 2 MB for the longest recording, well under the bucket's 5 MB limit.
const AUDIO_BITS_PER_SECOND = 96_000;

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * Records a voice message in the browser: record, stop, listen, delete. The
 * microphone is only requested on click, and released as soon as recording
 * stops or the form closes. Sending is left to the form.
 */
export function FeedbackAudioRecorder({
  t,
  disabled,
  onRecordingChange,
  onAudioChange,
}: {
  t: Dictionary["dashboard"]["feedback"];
  disabled: boolean;
  onRecordingChange: (recording: boolean) => void;
  onAudioChange: (audio: Blob | null) => void;
}) {
  const [status, setStatus] = useState<"idle" | "starting" | "recording">("idle");
  const [seconds, setSeconds] = useState(0);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [problem, setProblem] = useState<"denied" | "unsupported" | null>(null);
  const mountedRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function stopRecording() {
    clearInterval(timerRef.current);
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearInterval(timerRef.current);
      if (recorderRef.current) recorderRef.current.onstop = null;
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!playbackUrl) return;
    return () => URL.revokeObjectURL(playbackUrl);
  }, [playbackUrl]);

  async function startRecording() {
    setProblem(null);
    const mimeType =
      typeof MediaRecorder === "undefined"
        ? undefined
        : RECORDING_TYPES.find((type) => MediaRecorder.isTypeSupported(type));
    if (!mimeType || !navigator.mediaDevices) {
      setProblem("unsupported");
      return;
    }

    setStatus("starting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setStatus("idle");
      setProblem("denied");
      return;
    }
    if (!mountedRef.current) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      audioBitsPerSecond: AUDIO_BITS_PER_SECOND,
    });
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      setStatus("idle");
      onRecordingChange(false);
      const audio = new Blob(chunks, { type: mimeType.replace(/;.*/, "") });
      if (audio.size === 0) {
        setProblem("unsupported");
        return;
      }
      setPlaybackUrl(URL.createObjectURL(audio));
      onAudioChange(audio);
    };
    streamRef.current = stream;
    recorderRef.current = recorder;
    recorder.start();

    const startedAt = Date.now();
    setSeconds(0);
    setStatus("recording");
    onRecordingChange(true);
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setSeconds(Math.min(elapsed, FEEDBACK_AUDIO_MAX_SECONDS));
      if (elapsed >= FEEDBACK_AUDIO_MAX_SECONDS) stopRecording();
    }, 250);
  }

  function deleteAudio() {
    setPlaybackUrl(null);
    onAudioChange(null);
  }

  return (
    <div className="flex flex-col gap-2">
      {playbackUrl ? (
        <>
          <audio controls src={playbackUrl} aria-label={t.audioPlayback} className="w-full" />
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={deleteAudio}
            className="w-fit"
          >
            <Trash2 aria-hidden /> {t.audioDelete}
          </Button>
        </>
      ) : status === "recording" ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
          <p role="timer" aria-label={t.audioRecording} className="text-sm font-bold tabular-nums">
            <span className="text-destructive" aria-hidden>
              ●{" "}
            </span>
            {formatTime(seconds)} / {formatTime(FEEDBACK_AUDIO_MAX_SECONDS)}
          </p>
          <Button type="button" variant="outline" onClick={stopRecording}>
            <Square aria-hidden /> {t.audioStop}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          disabled={disabled || status === "starting"}
          onClick={startRecording}
          className="w-fit"
        >
          <Mic aria-hidden /> {t.audioRecord}
        </Button>
      )}
      {problem && (
        <p role="alert" className="text-sm text-destructive">
          {problem === "denied" ? t.audioDenied : t.audioUnsupported}
        </p>
      )}
      <p className="text-xs text-muted-foreground">{t.audioNotice}</p>
    </div>
  );
}
