import { Badge, Card, Header, Paragraph, Divider } from "../components";

export default function BadgeShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Badge Components" variant="bordered">
        <div className="space-y-6">
          <div>
            <Header size="lg" className="mb-4">
              Default Badges
            </Header>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          <Divider />

          <div>
            <Header size="lg" className="mb-4">
              Small Badges
            </Header>
            <div className="flex flex-wrap gap-4">
              <Badge size="sm">Small Default</Badge>
              <Badge size="sm" variant="success">
                Small Success
              </Badge>
              <Badge size="sm" variant="warning">
                Small Warning
              </Badge>
              <Badge size="sm" variant="error">
                Small Error
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
