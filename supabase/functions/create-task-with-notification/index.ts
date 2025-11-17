import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.0";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schema for task data
const taskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
  status: z.string().min(1),
  department_id: z.string().uuid(),
  created_by: z.string().uuid(),
  assigned_to: z.string().uuid().nullable(),
  due_date: z.string().nullable(),
});

interface TaskData {
  title: string;
  description?: string;
  priority: string;
  status: string;
  department_id: string;
  created_by: string;
  assigned_to: string | null;
  due_date: string | null;
  email?: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    const rawData: TaskData = await req.json();

    // Validate input data
    const taskData = taskSchema.parse(rawData);

    console.log('Creating task with ID:', taskData.department_id);

    // Create the task
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();

    if (taskError) {
      console.error('Error creating task:', taskError);
      throw taskError;
    }

    console.log('Task created successfully:', task);

    // Determine email to send to
    let recipientEmail = taskData.email;
    let recipientName = 'User';

    // If there's an assignee, create a ticket and get their info
    if (taskData.assigned_to) {
      // Get assignee details
      const { data: assignee, error: assigneeError } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', taskData.assigned_to)
        .single();

      if (assigneeError) {
        console.error('Error fetching assignee:', assigneeError);
      } else {
        console.log('Assignee found:', assignee);
        // Use assignee email if no custom email provided
        if (!recipientEmail) {
          recipientEmail = assignee.email;
        }
        recipientName = assignee.full_name || assignee.email;

        // Create a ticket for the assignee
        const { error: ticketError } = await supabase
          .from('tickets')
          .insert({
            title: `Task Assignment: ${taskData.title}`,
            description: taskData.description,
            priority: taskData.priority as any,
            department_id: taskData.department_id,
            created_by: taskData.created_by,
            assigned_to: taskData.assigned_to,
            status: 'open',
          });

        if (ticketError) {
          console.error('Error creating ticket:', ticketError);
        } else {
          console.log('Ticket created successfully');
        }
      }
    }

    // Send email notification if we have a recipient email
    if (recipientEmail) {
      try {
        const emailResponse = await resend.emails.send({
          from: 'Tasks <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `New Task Assigned: ${taskData.title}`,
          html: `
            <h1>New Task Assignment</h1>
            <p>Hello ${recipientName},</p>
            <p>You have been assigned a new task:</p>
            <h2>${taskData.title}</h2>
            <p><strong>Description:</strong> ${taskData.description}</p>
            <p><strong>Priority:</strong> ${taskData.priority}</p>
            <p><strong>Status:</strong> ${taskData.status}</p>
            ${taskData.due_date ? `<p><strong>Due Date:</strong> ${new Date(taskData.due_date).toLocaleDateString()}</p>` : ''}
            <p>Please check your dashboard for more details.</p>
            <p>Best regards,<br>Task Management System</p>
          `,
        });

        console.log('Email sent successfully:', emailResponse);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't throw - we still want to return success if task was created
      }
    }

    return new Response(
      JSON.stringify({ success: true, task }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in create-task-with-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
