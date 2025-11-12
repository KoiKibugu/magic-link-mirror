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

export const ProductionTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Bill of Materials Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            onChange={(e) => setFormData({ ...formData, "Product Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientSpecs">Client Specifications</Label>
          <Textarea
            id="clientSpecs"
            placeholder="Enter client specification details"
            onChange={(e) => setFormData({ ...formData, "Client Specifications": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="materials">Materials List</Label>
          <Textarea
            id="materials"
            placeholder="Part Number - Description - Quantity - Unit&#10;P001 - Circuit Board - 1 - pcs&#10;P002 - Resistor 10k - 5 - pcs"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Materials List": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCost">Total Material Cost</Label>
          <Input
            id="totalCost"
            placeholder="Enter total cost"
            onChange={(e) => setFormData({ ...formData, "Total Material Cost": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Role Assignment Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            onChange={(e) => setFormData({ ...formData, "Project Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectManager">Project Manager</Label>
          <Input
            id="projectManager"
            placeholder="Enter name"
            onChange={(e) => setFormData({ ...formData, "Project Manager": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teamMembers">Team Assignments</Label>
          <Textarea
            id="teamMembers"
            placeholder="Name - Role - Responsibilities&#10;John Doe - Lead Tech - Circuit design&#10;Jane Smith - Assembler - Component assembly"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Team Assignments": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Start Date": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Component Order Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input
            id="orderNumber"
            placeholder="Enter order number"
            onChange={(e) => setFormData({ ...formData, "Order Number": e.target.value })}
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
          <Label htmlFor="components">Components</Label>
          <Textarea
            id="components"
            placeholder="Component - Part Number - Quantity - Unit Price&#10;Resistor - R-10K - 100 - $0.05&#10;Capacitor - C-100uF - 50 - $0.10"
            rows={8}
            onChange={(e) => setFormData({ ...formData, Components: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Required Delivery Date</Label>
          <Input
            id="deliveryDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Required Delivery Date": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Product Completion Form") {
    return (
      <div className="space-y-4">
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
          <Label htmlFor="completionDate">Completion Date</Label>
          <Input
            id="completionDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Completion Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Completed</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            onChange={(e) => setFormData({ ...formData, "Quantity Completed": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qualityCheck">Quality Check Status</Label>
          <Input
            id="qualityCheck"
            placeholder="Pass/Fail"
            onChange={(e) => setFormData({ ...formData, "Quality Check Status": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional notes"
            onChange={(e) => setFormData({ ...formData, Notes: e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
