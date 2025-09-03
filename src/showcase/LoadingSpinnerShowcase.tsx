import { LoadingSpinner, Card, Header, Paragraph } from "../components";

export default function LoadingSpinnerShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Loading Spinner" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            CLI-style loading spinner in different sizes.
          </Paragraph>

          <div className="flex items-center gap-4">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="base" />
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </Card>
    </div>
  );
}
