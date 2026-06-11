# Resume Generator

Professional ATS-friendly resume generator that converts resume JSON data to DOCX and PDF formats.

## Import

```tsx
import {
  downloadResume,
  generateResumeDocx,
  generateResumePdf,
  type ResumeData,
  type ResumeFormat,
  type Experience,
  type Education,
} from '@allsetlabs/forge/lib/generateResume';
```

## downloadResume(resumeData: ResumeData, format?: ResumeFormat): Promise<void>

Generates and downloads a resume document in the specified format.

**Parameters:**

- `resumeData` - Resume data object
- `format` - `'docx'` or `'pdf'` (default: `'docx'`)

```tsx
// Download DOCX resume
await downloadResume(resumeData, 'docx');

// Download PDF resume
await downloadResume(resumeData, 'pdf');
```

## generateResumeDocx(resumeData: ResumeData): Promise<Blob>

Generates a DOCX resume from resume data and returns a Blob.

```tsx
const resumeData: ResumeData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '555-0100',
  summary: 'Experienced software engineer...',
  skills: {
    Frontend: ['React', 'TypeScript'],
    Backend: ['Node.js', 'Python'],
  },
  experience: [
    {
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      position: 'Senior Engineer',
      startDate: '2020-01',
      endDate: 'Present',
      achievements: ['Built scalable systems', 'Led team of 5'],
    },
  ],
  education: [
    {
      institution: 'University',
      degree: 'BS Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
    },
  ],
};

await generateResumeDocx(resumeData);
```

## generateResumePdf(resumeData: ResumeData): Promise<Blob>

Generates a PDF resume from resume data and returns a Blob.

```tsx
const blob = await generateResumePdf(resumeData);
```

## TypeScript Types

```tsx
type ResumeFormat = 'docx' | 'pdf';

interface ResumeData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  visaStatus?: string;
  preferredLocations?: string[];
  openToRemote?: boolean;
  summary?: string;
  skills?: Record<string, string[]>;
  experience?: Experience[];
  education?: Education[];
}

interface Experience {
  company?: string;
  location?: string;
  position?: string;
  startDate?: string; // Format: 'YYYY-MM'
  endDate?: string; // Format: 'YYYY-MM' or 'Present'
  achievements?: string[];
  companyDescription?: string;
}

interface Education {
  institution?: string;
  degree?: string;
  startDate?: string; // Format: 'YYYY-MM'
  endDate?: string; // Format: 'YYYY-MM' or 'Present'
}
```

## Notes

- `downloadResume()` takes resumeData as first parameter and uses `file-saver` to save the file
- Generates ATS-friendly formatting with proper sections and styling
- Uses Arial font at 10-20pt sizes for readability
- DOCX generated via `docx` library, PDF via `pdfmake`
- Automatically downloads file to user's browser
