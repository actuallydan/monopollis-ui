import {
  AudioPlayer,
  InlineAudioPlayer,
  Card,
  Paragraph,
  Divider,
} from "../components";

export default function AudioPlayerShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Audio Player Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Simple audio player with monochromatic terminal styling and full
            controls.
          </Paragraph>

          <AudioPlayer
            src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            title="Sample Audio Track"
            className="max-w-md"
          />

          <Divider />

          <Paragraph size="sm">
            Inline audio player for compact previews.
          </Paragraph>

          <InlineAudioPlayer
            src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            title="Inline Preview"
            className="max-w-md"
          />
        </div>
      </Card>
    </div>
  );
}
