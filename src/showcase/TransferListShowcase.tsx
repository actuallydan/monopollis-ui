import { useState } from "react";
import { TransferList, Card, Header, Paragraph } from "../components";

export default function TransferListShowcase() {
  const [transferLeftItems, setTransferLeftItems] = useState([
    { id: "1", label: "React" },
    { id: "2", label: "TypeScript" },
    { id: "3", label: "Tailwind CSS" },
    { id: "4", label: "Vite" },
    { id: "5", label: "Lucide React" },
    { id: "6", label: "TanStack Table" },
  ]);
  const [transferRightItems, setTransferRightItems] = useState([
    { id: "7", label: "Node.js" },
    { id: "8", label: "Express" },
  ]);

  // Transfer list handlers
  const handleTransfer = (fromLeft: boolean, itemIds: string[]) => {
    if (fromLeft) {
      const itemsToMove = transferLeftItems.filter((item) =>
        itemIds.includes(item.id)
      );
      setTransferLeftItems((prev) =>
        prev.filter((item) => !itemIds.includes(item.id))
      );
      setTransferRightItems((prev) => [...prev, ...itemsToMove]);
    } else {
      const itemsToMove = transferRightItems.filter((item) =>
        itemIds.includes(item.id)
      );
      setTransferRightItems((prev) =>
        prev.filter((item) => !itemIds.includes(item.id))
      );
      setTransferLeftItems((prev) => [...prev, ...itemsToMove]);
    }
  };

  return (
    <div className="space-y-8">
      <Card title="Transfer List Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Transfer items between two lists with search and bulk selection
            capabilities.
          </Paragraph>

          <TransferList
            leftTitle="Available Technologies"
            rightTitle="Selected Technologies"
            leftItems={transferLeftItems}
            rightItems={transferRightItems}
            onTransfer={handleTransfer}
            maxHeight={250}
            searchable={true}
            selectAll={true}
          />
        </div>
      </Card>
    </div>
  );
}
