import { Breadcrumbs, Card, Header, Paragraph, Divider } from "../components";

export default function BreadcrumbsShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Breadcrumbs Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Navigation breadcrumbs with customizable separators and home icon.
          </Paragraph>

          <Breadcrumbs
            items={[
              { label: "Projects", href: "#projects" },
              { label: "monopollis", href: "#monopollis" },
              { label: "src", href: "#src" },
              { label: "components" },
            ]}
            showHome={true}
            homeHref="#home"
          />

          <Divider />

          <Breadcrumbs
            items={[
              { label: "Settings", href: "#settings" },
              { label: "User Preferences", href: "#preferences" },
              { label: "Theme" },
            ]}
            showHome={false}
            separator={<span className="text-orange-300/50">/</span>}
          />
        </div>
      </Card>
    </div>
  );
}
