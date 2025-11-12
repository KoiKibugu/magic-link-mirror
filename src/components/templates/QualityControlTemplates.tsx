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

export const QualityControlTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Client Specification Sheet") {
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
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            onChange={(e) => setFormData({ ...formData, "Product Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specifications">Technical Specifications</Label>
          <Textarea
            id="specifications"
            placeholder="Enter detailed specifications"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Technical Specifications": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tolerances">Tolerances</Label>
          <Textarea
            id="tolerances"
            placeholder="Enter tolerance requirements"
            onChange={(e) => setFormData({ ...formData, Tolerances: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testingRequirements">Testing Requirements</Label>
          <Textarea
            id="testingRequirements"
            placeholder="Enter testing requirements"
            onChange={(e) => setFormData({ ...formData, "Testing Requirements": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Quality Inspection Certificate") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="certificateNumber">Certificate Number</Label>
          <Input
            id="certificateNumber"
            placeholder="Enter certificate number"
            onChange={(e) => setFormData({ ...formData, "Certificate Number": e.target.value })}
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
          <Label htmlFor="batchNumber">Batch Number</Label>
          <Input
            id="batchNumber"
            placeholder="Enter batch number"
            onChange={(e) => setFormData({ ...formData, "Batch Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inspectionDate">Inspection Date</Label>
          <Input
            id="inspectionDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Inspection Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testsPerformed">Tests Performed</Label>
          <Textarea
            id="testsPerformed"
            placeholder="List all tests performed"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Tests Performed": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="result">Result</Label>
          <Input
            id="result"
            placeholder="Pass/Fail"
            onChange={(e) => setFormData({ ...formData, Result: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inspector">Inspector Name</Label>
          <Input
            id="inspector"
            placeholder="Enter inspector name"
            onChange={(e) => setFormData({ ...formData, "Inspector Name": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Packing List") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="packingListNumber">Packing List Number</Label>
          <Input
            id="packingListNumber"
            placeholder="Enter packing list number"
            onChange={(e) => setFormData({ ...formData, "Packing List Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input
            id="orderNumber"
            placeholder="Enter order number"
            onChange={(e) => setFormData({ ...formData, "Order Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Items</Label>
          <Textarea
            id="items"
            placeholder="Item - Quantity - Weight - Dimensions&#10;Product A - 10 - 5kg - 30x20x10cm&#10;Product B - 5 - 2kg - 15x10x8cm"
            rows={8}
            onChange={(e) => setFormData({ ...formData, Items: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalPackages">Total Packages</Label>
          <Input
            id="totalPackages"
            type="number"
            placeholder="Enter total packages"
            onChange={(e) => setFormData({ ...formData, "Total Packages": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Warranty Card") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="warrantyNumber">Warranty Number</Label>
          <Input
            id="warrantyNumber"
            placeholder="Enter warranty number"
            onChange={(e) => setFormData({ ...formData, "Warranty Number": e.target.value })}
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
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            placeholder="Enter serial number"
            onChange={(e) => setFormData({ ...formData, "Serial Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Purchase Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warrantyPeriod">Warranty Period</Label>
          <Input
            id="warrantyPeriod"
            placeholder="e.g., 12 months"
            onChange={(e) => setFormData({ ...formData, "Warranty Period": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="terms">Warranty Terms</Label>
          <Textarea
            id="terms"
            placeholder="Enter warranty terms and conditions"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Warranty Terms": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Delivery Note") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="deliveryNoteNumber">Delivery Note Number</Label>
          <Input
            id="deliveryNoteNumber"
            placeholder="Enter delivery note number"
            onChange={(e) => setFormData({ ...formData, "Delivery Note Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Delivery Date</Label>
          <Input
            id="deliveryDate"
            type="datetime-local"
            onChange={(e) => setFormData({ ...formData, "Delivery Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Name</Label>
          <Input
            id="recipient"
            placeholder="Enter recipient name"
            onChange={(e) => setFormData({ ...formData, "Recipient Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address</Label>
          <Textarea
            id="address"
            placeholder="Enter delivery address"
            onChange={(e) => setFormData({ ...formData, "Delivery Address": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="items">Items Delivered</Label>
          <Textarea
            id="items"
            placeholder="Item - Quantity - Condition&#10;Product A - 10 - Good&#10;Product B - 5 - Good"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Items Delivered": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveredBy">Delivered By</Label>
          <Input
            id="deliveredBy"
            placeholder="Enter driver/courier name"
            onChange={(e) => setFormData({ ...formData, "Delivered By": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
