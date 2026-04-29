import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, weddingDate, budget, categories, concern, impact, notes } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `New Waitlist Signup from ${name} via theaisle.com`,
      text: `
        Name: ${name}
        Email: ${email}
        Wedding Date: ${weddingDate}
        Budget: ${budget}
        Categories: ${categories.join(', ')}
        Biggest Concern: ${concern}
        Target Impact: ${impact}
        Notes: ${notes}
      `,
      html: `
        <h3>New Waitlist Signup</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Wedding Date:</strong> ${weddingDate}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Categories:</strong> ${categories.join(', ')}</p>
        <p><strong>Biggest Concern:</strong> ${concern}</p>
        <p><strong>Target Impact:</strong> ${impact}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
