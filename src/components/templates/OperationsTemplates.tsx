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

export const OperationsTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Client Correspondence List") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Client Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Enter subject"
            onChange={(e) => setFormData({ ...formData, Subject: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="correspondenceType">Type of Correspondence</Label>
          <Input
            id="correspondenceType"
            placeholder="Email, Phone, Meeting, etc."
            onChange={(e) => setFormData({ ...formData, "Type of Correspondence": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            placeholder="Brief summary of the correspondence"
            onChange={(e) => setFormData({ ...formData, Summary: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="actionItems">Action Items</Label>
          <Textarea
            id="actionItems"
            placeholder="List action items"
            onChange={(e) => setFormData({ ...formData, "Action Items": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Local Purchase Order (LPO)") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lpoNumber">LPO Number</Label>
          <Input
            id="lpoNumber"
            placeholder="Enter LPO number"
            onChange={(e) => setFormData({ ...formData, "LPO Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplierName">Supplier Name</Label>
          <Input
            id="supplierName"
            placeholder="Enter supplier name"
            onChange={(e) => setFormData({ ...formData, "Supplier Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Order Date</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Order Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Items Ordered</Label>
          <Textarea
            id="items"
            placeholder="Item 1 - Qty: 10 - Price: $100&#10;Item 2 - Qty: 5 - Price: $50"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Items Ordered": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            id="totalAmount"
            placeholder="Enter total amount"
            onChange={(e) => setFormData({ ...formData, "Total Amount": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
          <Input
            id="deliveryDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Expected Delivery Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Special Instructions</Label>
          <Textarea
            id="notes"
            placeholder="Enter any special instructions"
            onChange={(e) => setFormData({ ...formData, "Special Instructions": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
