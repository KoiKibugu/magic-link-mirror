import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsViewProps {
  userDepartment: any;
}

export const DocumentsView = ({ userDepartment }: DocumentsViewProps) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, [userDepartment]);

  const fetchDocuments = async () => {
    if (!userDepartment) return;

    const { data: templatesData } = await supabase
      .from("document_templates")
      .select("*")
      .eq("department_id", userDepartment.id);

    const { data: submissionsData } = await supabase
      .from("document_submissions")
      .select("*, document_templates(*)")
      .order("created_at", { ascending: false });

    if (templatesData) setTemplates(templatesData);
    if (submissionsData) setSubmissions(submissionsData);
  };

  // Define document templates for each department
  const departmentDocuments: Record<string, string[]> = {
    "01": ["Questionnaires", "Checklists", "Product List", "Client Needs Form"],
    "02": ["Client Correspondence List", "Local Purchase Order (LPO)"],
    "03": ["Contract", "Invoice", "Confirmation Form"],
    "04": ["Bill of Materials Form", "Role Assignment Form", "Component Order Form", "Product Completion Form"],
    "05": ["Stock in Form", "Stock Out Form", "Suppliers List"],
    "06": ["Client Specification Sheet", "Quality Inspection Certificate", "Packing List", "Warranty Card", "Delivery Note"],
    "07": ["Date Record, Manufacturing"],
    "08": ["Field Work Form", "Questionnaires"],
    "09": [],
  };

  const departmentDocs = departmentDocuments[userDepartment?.code] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Documents</h1>
        <p className="text-muted-foreground">Manage forms and documentation</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Available Forms</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departmentDocs.map((doc) => (
            <Card key={doc}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {doc}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}
          {departmentDocs.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-muted-foreground">
                No specific forms assigned to this department yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Submissions</h2>
        <div className="grid gap-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No submissions yet.
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {submission.document_templates?.name}
                    </CardTitle>
                    <Badge variant="outline">{submission.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
