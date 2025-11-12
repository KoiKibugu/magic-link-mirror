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

export const InventoryTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Stock in Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="datetime-local"
            onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            placeholder="Enter supplier name"
            onChange={(e) => setFormData({ ...formData, Supplier: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Items Received</Label>
          <Textarea
            id="items"
            placeholder="Item Code - Description - Quantity - Location&#10;IT-001 - Resistor 10k - 500 - A-12&#10;IT-002 - Capacitor 100uF - 200 - B-05"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Items Received": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="receivedBy">Received By</Label>
          <Input
            id="receivedBy"
            placeholder="Enter name"
            onChange={(e) => setFormData({ ...formData, "Received By": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Stock Out Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dateTime">Date and Time</Label>
          <Input
            id="dateTime"
            type="datetime-local"
            onChange={(e) => setFormData({ ...formData, "Date and Time": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="requisitionNumber">Requisition Number</Label>
          <Input
            id="requisitionNumber"
            placeholder="Enter requisition number"
            onChange={(e) => setFormData({ ...formData, "Requisition Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Items</Label>
          <Textarea
            id="items"
            placeholder="Item Code - Description - Quantity - Location&#10;IT-001 - Resistor 10k - 50 - A-12&#10;IT-002 - Capacitor 100uF - 25 - B-05"
            rows={8}
            onChange={(e) => setFormData({ ...formData, Items: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickedBy">Picked By</Label>
          <Input
            id="pickedBy"
            placeholder="Enter name"
            onChange={(e) => setFormData({ ...formData, "Picked By": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Input
            id="purpose"
            placeholder="Production order, maintenance, etc."
            onChange={(e) => setFormData({ ...formData, Purpose: e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Suppliers List") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="suppliers">Suppliers</Label>
          <Textarea
            id="suppliers"
            placeholder="Supplier Name - Contact Person - Phone - Email - Products&#10;ABC Electronics - John Doe - +123456789 - john@abc.com - Resistors, Capacitors&#10;XYZ Components - Jane Smith - +987654321 - jane@xyz.com - ICs, Transistors"
            rows={12}
            onChange={(e) => setFormData({ ...formData, Suppliers: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastUpdated">Last Updated</Label>
          <Input
            id="lastUpdated"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Last Updated": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
