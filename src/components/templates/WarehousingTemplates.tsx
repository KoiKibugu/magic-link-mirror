import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TemplateProps {
  documentType: string;
  onClose: () => void;
}

export const WarehousingTemplates = ({ documentType, onClose }: TemplateProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleDownload = () => {
    const content = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentType}.txt`;
    a.click();
    
    toast({
      title: "Downloaded",
      description: "Document template has been downloaded",
    });
  };

  if (documentType === "Date Record, Manufacturing") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="batchNumber">Batch Number</Label>
          <Input
            id="batchNumber"
            placeholder="Enter batch number"
            onChange={(e) => setFormData({ ...formData, "Batch Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            onChange={(e) => setFormData({ ...formData, "Product Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
          <Input
            id="manufacturingDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Manufacturing Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Produced</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            onChange={(e) => setFormData({ ...formData, "Quantity Produced": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry/Best Before Date</Label>
          <Input
            id="expiryDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Expiry Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storageLocation">Storage Location</Label>
          <Input
            id="storageLocation"
            placeholder="Enter storage location"
            onChange={(e) => setFormData({ ...formData, "Storage Location": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any special notes or observations"
            onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
