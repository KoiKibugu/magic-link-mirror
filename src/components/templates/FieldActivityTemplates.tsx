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

export const FieldActivityTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Field Work Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workOrderNumber">Work Order Number</Label>
          <Input
            id="workOrderNumber"
            placeholder="Enter work order number"
            onChange={(e) => setFormData({ ...formData, "Work Order Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientSite">Client/Site Name</Label>
          <Input
            id="clientSite"
            placeholder="Enter client or site name"
            onChange={(e) => setFormData({ ...formData, "Client/Site Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Textarea
            id="location"
            placeholder="Enter site location/address"
            onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateTime">Date and Time</Label>
          <Input
            id="dateTime"
            type="datetime-local"
            onChange={(e) => setFormData({ ...formData, "Date and Time": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="technician">Technician Name</Label>
          <Input
            id="technician"
            placeholder="Enter technician name"
            onChange={(e) => setFormData({ ...formData, "Technician Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workPerformed">Work Performed</Label>
          <Textarea
            id="workPerformed"
            placeholder="Describe work performed"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Work Performed": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="materialsUsed">Materials Used</Label>
          <Textarea
            id="materialsUsed"
            placeholder="List materials used"
            onChange={(e) => setFormData({ ...formData, "Materials Used": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeSpent">Time Spent (hours)</Label>
          <Input
            id="timeSpent"
            type="number"
            step="0.5"
            placeholder="Enter hours"
            onChange={(e) => setFormData({ ...formData, "Time Spent": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientSignature">Client Signature/Name</Label>
          <Input
            id="clientSignature"
            placeholder="Client confirmation"
            onChange={(e) => setFormData({ ...formData, "Client Signature": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Questionnaires") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="surveyTitle">Survey Title</Label>
          <Input
            id="surveyTitle"
            placeholder="Enter survey title"
            onChange={(e) => setFormData({ ...formData, "Survey Title": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="respondent">Respondent Name</Label>
          <Input
            id="respondent"
            placeholder="Enter respondent name"
            onChange={(e) => setFormData({ ...formData, "Respondent Name": e.target.value })}
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
          <Label htmlFor="questions">Questions and Responses</Label>
          <Textarea
            id="questions"
            placeholder="Q1: [Question]&#10;A1: [Response]&#10;&#10;Q2: [Question]&#10;A2: [Response]"
            rows={12}
            onChange={(e) => setFormData({ ...formData, "Questions and Responses": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional observations or notes"
            onChange={(e) => setFormData({ ...formData, "Additional Notes": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
