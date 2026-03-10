import { IFeedback } from '../feedback.interface';

export const emailContent = (newFeedback: IFeedback) => {
  const priorityColor =
    newFeedback.priority === 'urgent'
      ? '#dc2626'
      : newFeedback.priority === 'high'
        ? '#ea580c'
        : newFeedback.priority === 'medium'
          ? '#f59e0b'
          : '#16a34a';
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>New Feedback Notification</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:#2563eb;color:white;padding:20px;text-align:center;">
                <h2 style="margin:0;">User Feedback Intelligence System</h2>
                <p style="margin:5px 0 0;font-size:14px;">New Feedback Ticket Created</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:25px;">

                <p style="font-size:16px;color:#333;">
                  A new feedback ticket has been submitted and automatically classified by AI.
                </p>

                <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:15px;">

                  <tr>
                    <td style="border-bottom:1px solid #eee;font-weight:bold;width:120px;">Category</td>
                    <td style="border-bottom:1px solid #eee;">${newFeedback.category}</td>
                  </tr>

                  <tr>
  <td><strong>Priority</strong></td>
  <td style="color:${priorityColor};font-weight:bold">
  ${newFeedback.priority.toUpperCase()}
  </td>
  </tr>

                  <tr>
                    <td style="border-bottom:1px solid #eee;font-weight:bold;">Sentiment</td>
                    <td style="border-bottom:1px solid #eee;">${newFeedback.sentiment}</td>
                  </tr>

                  <tr>
                    <td style="border-bottom:1px solid #eee;font-weight:bold;">Submitted By</td>
                    <td style="border-bottom:1px solid #eee;">${newFeedback.userName || 'Anonymous'}</td>
                  </tr>

                </table>

                <!-- Message Section -->
                <div style="margin-top:20px;padding:15px;background:#f9fafb;border-left:4px solid #2563eb;">
                  <strong>Feedback Message:</strong>
                  <p style="margin-top:10px;color:#444;">
                    ${newFeedback.message}
                  </p>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9;text-align:center;padding:15px;font-size:12px;color:#666;">
                This notification was generated automatically by the 
                <strong>User Feedback Intelligence System</strong> using AI classification.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
