import SpeechRecognition from "@/shims-speech-recognition";

export type Language = "ja" | "en-US";

export interface SpeechRecognizerOptions {
  language: Language;
}

export interface RecognizeResult {
  transcript: string;
  confidence: number;
}

export type OnRecognizeListener = (results: RecognizeResult[]) => void;

export interface ISpeechRecognizer {
  start(): void;
  onRecognize(listener: OnRecognizeListener): void;
}

export class SpeechRecognizer implements ISpeechRecognizer {
  private options: SpeechRecognizerOptions;
  private recognition: SpeechRecognition;
  private isStarted: Boolean;

  public constructor(options: SpeechRecognizerOptions) {
    this.options = options;
    this.recognition = new SpeechRecognition();

    this.recognition.lang = this.options.language;
    this.recognition.continuous = true;

    this.isStarted = false;
  }

  public start() {
    if (this.isStarted) return;
    this.isStarted = true;
    this.recognition.start();
  }

  public onRecognize(listener: OnRecognizeListener) {
    this.recognition.onresult = function(event: SpeechRecognitionEvent) {
      const results: RecognizeResult[] = [];

      for (let i = 0; i < event.results.length; i++) {
        const { confidence, transcript } = event.results[i][0];
        results.push({ confidence, transcript });
      }
      listener(results);
    };
  }
}
